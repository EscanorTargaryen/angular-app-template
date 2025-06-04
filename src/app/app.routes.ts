import {Routes} from '@angular/router';
import {HomePage} from "./components/pages/home.page/home.page";
import {NotfoundPage} from "./components/pages/notfound.page/notfound.page";

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    title: "HomePage",
    data: {description: "A simple homepage"}
  },
  {path: '**', component: NotfoundPage, title: "Page not found",},
];
