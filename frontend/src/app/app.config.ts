import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { NgxMasonryModule } from 'ngx-masonry';
import { ApiInterceptor } from './api.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([ApiInterceptor])),
    provideAnimations(),
    provideClientHydration(),
    importProvidersFrom(NgxMasonryModule),
  ],
};
