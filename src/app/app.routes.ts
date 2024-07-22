import { Routes } from '@angular/router';
import {HomePageComponent} from "./components/pages/home-page/home-page.component";
import {Page404Component} from "./components/pages/page404/page404.component";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: "HomePage",
    data: {description: "A simple homepage"}
  },
  {path: '**', component: Page404Component, title: "Page not found",},
];
