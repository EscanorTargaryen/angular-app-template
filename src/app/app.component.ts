import {Component, inject, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Data, NavigationEnd, Router, RouterOutlet} from '@angular/router';

import {Meta} from "@angular/platform-browser";
import {filter, map, mergeMap, tap} from "rxjs";
import {isPlatformServer} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private meta: Meta) {

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
