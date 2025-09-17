import {ApplicationConfig, provideZoneChangeDetection, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay, withHttpTransferCacheOptions} from '@angular/platform-browser';
import {HttpRequest, provideHttpClient, withFetch} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(
    withEventReplay(),
    withHttpTransferCacheOptions({
      filter: (req: HttpRequest<unknown>) => false, // to filter. "false" no cache else cache
      includeHeaders: [], // to include headers
      includePostRequests: true, // to include POST
      includeRequestsWithAuthHeaders: false, // to include with auth
    }),
  ),
    provideZonelessChangeDetection(),
    provideHttpClient(
      withFetch(),
    )]
};
