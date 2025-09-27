import {APP_BASE_HREF} from '@angular/common';
import {CommonEngine} from '@angular/ssr/node';
import express from 'express';
import {fileURLToPath} from 'node:url';
import {dirname, join, resolve} from 'node:path';
import bootstrap from '../../src/main.server';
import {SitemapStream} from "sitemap";
import {routes} from "../../src/app/app.routes";
import {Routes} from "@angular/router";
import apiRouter from "./apiRouter";

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  server.disable('x-powered-by');
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  //SEO optimization robots

  //TODO replace with false for deployment.
  let developmentServer = process.env['DEVELOPMENT_SERVER'] === "true"

  //TODO replace with your domain.
  let hostName = developmentServer ? "http://localhost" : "https://domain.my"

  //TODO configure with your Robots.txt content.
  //The robots.txt file could also be hosted statically by placing it directly in the public folder. If you still prefer to have two different robots.txt files for the deployment and non-deployment phases, you can ignore this message.
  const indexableRobotsContent = developmentServer ?
    `User-agent: *
Disallow: /` :

    `sitemap: ${hostName}/sitemap.xml

User-agent: *

Disallow: /api/
Disallow: /assets/`;

  server.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(indexableRobotsContent);
  });

  //SEO optimization sitemap

  var apicache = require('apicache')
  var cache = apicache.middleware

  server.get('/sitemap.xml', cache('1 hour'), (req, res) => {
    res.header('Content-Type', 'application/xml');

    try {
      const smStream = new SitemapStream({hostname: hostName});

      (async () => {

        const getPaths = (routes: Routes): string[] => {
          let paths: string[] = [];

          for (const route of routes) {

            if (route.path !== "**") {

              if (route.path !== undefined) {
                paths.push(route.path);
              }

              let ch = [{ch: route.children, parent: route.path}]

              while (ch && ch.length > 0) {

                let tmp = [];
                for (let r of ch) {
                  if (r.ch)
                    for (let s of r.ch) {
                      paths.push(`${r.parent}/${s.path}`);

                      if (s.children) {
                        tmp.push({ch: s.children, parent: `${r.parent}/${s.path}`});
                      }
                    }
                }
                ch = tmp;
              }
            }
          }

          return paths;
        };

        const routeS = getPaths(routes);

        for (const route of routeS) {
          smStream.write(route);
        }

        smStream.end();

        smStream.pipe(res).on('error', (e) => {
          throw e;
        });
      })();
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  });

  server.use(express.json());
  server.use('/api/v1', apiRouter);

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const {protocol, originalUrl, baseUrl, headers} = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{provide: APP_BASE_HREF, useValue: baseUrl}],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
