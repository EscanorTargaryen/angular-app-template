# Angular App Template

This repo contains an Angular project with everything you need to start developing a new web app.

## Stacks

- Angular SSR
- TailwindCSS
- Node.js 
- TypeScript

Check out [`GitHub tags`](https://github.com/EscanorTargaryen/angular-app-template/tags) to see the versions of Angular supported by this project.

## Features

- Angular with SSR ([A complete guide to SSR](https://www.angulararchitects.io/blog/complete-guide-for-server-side-rendering-ssr-in-angular/)).
- TailwindCSS.
- `components` folder.
- `components/UI` folder.
- `components/pages` folder with `HomePageComponent` and `Page404Component`.
- `<router-outlet></router-outlet>` in `app.component.html`.
- [Angular CDK](https://material.angular.io/cdk/categories).
- Possibility to set different `title` and `description` per page.
- [`sitemap`](https://www.npmjs.com/package/sitemap) and [`apicache`](https://www.npmjs.com/package/apicache) to serve `robots.txt` and `sitemap.xml`.
- `Dockerfile` to build a Docker Image.
- `provideHttpClient(withFetch())` already set.
  - From angular.dev: `It's strongly recommended to enable fetch for applications that use Server-Side Rendering for better performance and compatibility.`
- Hydration already set with:
  - [`EventReplay`](https://angular.dev/api/platform-browser/withEventReplay)
  - custom [`HttpTransferCacheOptions`](https://angular.dev/api/platform-browser/withHttpTransferCacheOptions).
## Setup the project

1. Clone the repository (from [`GitHub tags`](https://github.com/EscanorTargaryen/angular-app-template/tags) you can choose the Angular version).
2. Move the repository to new git repository.
    - `cd` to repo folder. 
    - remove .git (hidden) folder. 
    - run `git init`.
3. Rename the project.
    - rename the project folder.
    - find all occurrences of `angular-app-template` in the project and replace it with your new app name.
4. Rename path in Dockerfile.
    - last line replace `project-name` with your project name.

#### During development:
- Customize routes in `app.routes.ts`. 
- Setup `server.ts` following the TODOs.
  - you have to set the content of the `robots.txt` and the list of pages for the `sitemap.xml`.
- Customize HTTP request cache system in `app.config.ts`.

## Serve the app with Docker

- `cd` to app folder.
- run `sudo docker build . -t app-name -f Dockerfile` to build an Image of the project.
- run `sudo docker run -d -p 4000:4000 --restart unless-stopped --name app-name app-name` to create a new container from the Image.

## Contributing

Feel free to open issues or pull requests to discuss improvements and other features.
