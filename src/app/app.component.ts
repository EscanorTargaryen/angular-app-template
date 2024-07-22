import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data, NavigationEnd, Router, RouterOutlet} from '@angular/router';

import {Meta} from "@angular/platform-browser";
import {filter, map, mergeMap, tap} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'angular-app-template';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private meta: Meta) {
  }

  ngOnInit() {

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

  updateDescription(description: string) {
    if (description) {
      this.meta.updateTag({name: 'description', content: description});
    }
  }

}
