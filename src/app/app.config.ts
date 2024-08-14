import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay, withHttpTransferCacheOptions} from '@angular/platform-browser';
import {HttpRequest} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideClientHydration(
    withEventReplay(),
    withHttpTransferCacheOptions({
      filter: (req: HttpRequest<unknown>) => true, // to filter
      includeHeaders: [], // to include headers
      includePostRequests: true, // to include POST
      includeRequestsWithAuthHeaders: false, // to include with auth
    }),
  ),]
};
