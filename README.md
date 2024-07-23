# Angular App Template

This repo contains an Angular project with everything you need to start developing a new web app.

## Staks

- Angular SSR v18.1.1
- TailwindCSS v3.4.6
- Node.js (check [Angular version compatibility](https://angular.dev/reference/versions))
- TypeScript (check [Angular version compatibility](https://angular.dev/reference/versions))

## Features

- Angular with SSR.
- TailwindCSS already installed.
- `components` folder.
- `components/UI` folder.
- `components/pages` folder with `HomePageComponent` and `Page404Component`.
- `<router-outlet></router-outlet>` in `app.component.html`.
- [Angular CDK](https://material.angular.io/cdk/categories) already installed.
- Possibility to set different `title` and `description` per page.
- [`sitemap`](https://www.npmjs.com/package/sitemap) and [`apicache`](https://www.npmjs.com/package/apicache) to serve `robots.txt` and `sitemap.xml`.
- `Dockerfile` to build a Docker Image.
- `provideHttpClient(withFetch())` already set.
  - From angular.dev: `It's strongly recommended to enable fetch for applications that use Server-Side Rendering for better performance and compatibility.`

## Setup the project

1. Clone the repository (from [`GitHub tags`](https://github.com/EscanorTargaryen/angular-app-template/tags) you can choose the Angular version).
2. Rename the project.
    - rename the project folder.
    - find all occurrences of `angular-app-template` in the project and replace it with you new app name.
3. Customize routes in `app.routes.ts`.
4. Setup `server.ts` following the TODOs.
    - you have to set the content of the `robots.txt` and the list of pages for the `sitemap.xml`.
5. Rename path in Dockerfile.
    - last line replace `project-name` with your project name.

## Serve the app with Docker

- `cd` to app folder.
- run `sudo docker build . -t app-name -f Dockerfile` to build an Image of the project.
- run `sudo docker run -d -p 4000:4000 --restart unless-stopped --name app-name app-name` to create a new container from the Image.
