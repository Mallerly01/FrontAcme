import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LOCALE_ID } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { SocialLoginModule, SOCIAL_AUTH_CONFIG, SocialAuthServiceConfig,
  GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    {provide: LOCALE_ID, useValue: 'es_CL'},
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(SocialLoginModule),

    {
      provide: SOCIAL_AUTH_CONFIG,
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider:
            new GoogleLoginProvider('845784140745-5gbmiqfc2uaojn0esckadrv761246uph.apps.googleusercontent.com')
          }
        ],
        onError:(err) => console.error('Error Auth: ', err)
      }as SocialAuthServiceConfig
    }
  ]
};
