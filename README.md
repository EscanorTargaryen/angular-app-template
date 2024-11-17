# Angular App Template

This repo contains an Angular project with everything you need to start developing a new web app.

## Stacks

- Angular SSR
- TailwindCSS
- Node.js & Prisma
- TypeScript

Check out the [`GitHub tags`](https://github.com/EscanorTargaryen/angular-app-template/tags) to see which Angular versions are supported by this project.

## Features

- Angular with SSR ([A complete guide to SSR](https://www.angulararchitects.io/blog/complete-guide-for-server-side-rendering-ssr-in-angular/)).
- TailwindCSS.
- Folder structure:
  - `components` folder.
  - `components/UI` folder.
  - `components/pages` folder with `HomePageComponent` and `Page404Component`.
  - `services` folder with `EnvService`.
- `<router-outlet></router-outlet>` in `app.component.html`.
- [Angular CDK](https://material.angular.io/cdk/categories).
- Ability to set different `title` and `description` per page.
- [`sitemap`](https://www.npmjs.com/package/sitemap) and [`apicache`](https://www.npmjs.com/package/apicache) to serve `robots.txt` and `sitemap.xml`.
- `Dockerfile` to build a Docker Image.
- `provideHttpClient(withFetch())` already configured.
  - From angular.dev: `It's strongly recommended to enable fetch for applications that use Server-Side Rendering for better performance and compatibility.`
- Hydration already configured with:
  - [`EventReplay`](https://angular.dev/api/platform-browser/withEventReplay)
  - custom [`HttpTransferCacheOptions`](https://angular.dev/api/platform-browser/withHttpTransferCacheOptions).
- Shell script `development.sh` to reload the docker container.
- Unified `.env` file for both frontend and backend ([Read more](https://medium.com/@iyieldinov/angular-17-ssr-leveraging-transferstate-for-server-side-environment-variables-or-other-external-2fcb6adbdd06)).
- Ready to use `Prisma` with `Node.js` database ORM and backend.

## Setup the project

1. Clone the repository (you can choose the Angular version from the [`GitHub tags`](https://github.com/EscanorTargaryen/angular-app-template/tags)).
2. Move the repository to new git repository.
    - `cd` to the repo folder. 
    - remove .git (hidden) folder. 
    - run `git init`.
3. Rename the project.
    - rename the project folder.
    - find all occurrences of `angular-app-template` in the project and replace it with your new app name.
4. Rename path in Dockerfile.
    - in the last line, replace `project-name` with your project name.
5. Set parameters in `development.sh`.
6. Add `.env` to `.gitignore`.

#### During development:
- Customize routes in `app.routes.ts`. 
- Setup `server.ts` by following the TODOs.
  - define the content of `robots.txt`
  - static routes are automatically added to `sitemap.xml` (it's your task to manage the dynamic ones).
- Customize the HTTP request cache system in `app.config.ts`.
- Customize `.env` variables. To pass them to the frontend, follow this steps:
  - Add a new variable into `.env`.
  - Pass it into TransferState in `app.config.server.ts`.
  - Retrieve it from TransferState into `env.service.ts`.
- Configure your db in `prisma/schema.prisma` and the database link in `.env`.
- Configure your endpoints in `server/src`.

## Serve the app with Docker

- run `development.sh`.

## Test locally with server features

Running with `ng serve` means some server functionality (like `robots.txt` and `sitemap.xml`) will not work. So:
- run `npm run watch` (This will build the app each time the files are changed).
- start the node.js server to serve the app `npm run serve:ssr:angular-app-template` (replace `angular-app-template` whit your app name).

## Contributing

Feel free to open issues or pull requests to discuss improvements and additional features.
