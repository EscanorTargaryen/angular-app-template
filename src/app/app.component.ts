import {Component, inject, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Data, NavigationEnd, Router, RouterOutlet} from '@angular/router';

import {Meta} from "@angular/platform-browser";
import {filter, map, mergeMap, tap} from "rxjs";
import {isPlatformServer} from "@angular/common";
import {EnvService} from "./services/env/env.service";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

  router= inject(Router);
  activatedRoute= inject(ActivatedRoute);
  meta= inject(Meta);
  env= inject(EnvService);

  constructor() {

    const platformId = inject(PLATFORM_ID);
    const isServer: boolean = isPlatformServer(platformId);

    if (isServer) {
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          map(() => this.activatedRoute),
          map((route) => {
            while (route.firstChild) {
              route = route.firstChild;
            }
            return route;
          }),
          filter((route) => route.outlet === 'primary'),
          mergeMap((route) => route.data),
          tap(({description}: Data) => {
            this.updateDescription(description);
          })
        ).subscribe();
    }

  }

  updateDescription(description: string) {
    if (description) {
      this.meta.updateTag({name: 'description', content: description});
    }
  }

}
