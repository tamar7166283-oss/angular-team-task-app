import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { authInterceptor } from './interceptors/auth-interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    
    // איחוד של כל הגדרות הראוטר למקום אחד
    provideRouter(
      routes, 
      withComponentInputBinding(), // מאפשר העברת פרמטרים ל-Inputs
      withRouterConfig({ 
        paramsInheritanceStrategy: 'always' // הקסם שמאפשר לילד לראות את ה-projectId של האבא
      })
    ),

    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
