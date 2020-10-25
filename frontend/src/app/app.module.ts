import { NgModule, Optional } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { LAZY_MAPS_API_CONFIG_KEY, MY_API_KEY } from './services/ModifierLazyMapsAPILoader';
import { EnvBrowserService, MY_API_URL, MY_API_URL_TOKEN, MY_SITE_DOMAIN } from './services/Env.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {AuthService} from './auth/services/authService';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'myvn-frontend' }),
    BrowserTransferStateModule ,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),

    BrowserAnimationsModule,

  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    EnvBrowserService,
    AuthService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(APP_ID) private appId: string,

    @Optional() @Inject(LAZY_MAPS_API_CONFIG_KEY) private configKey: string = null,
    @Optional() @Inject(MY_API_URL_TOKEN) private apiUrl: string = null,
    @Optional() @Inject(MY_SITE_DOMAIN) private siteDomain: string = null,

    private state: TransferState
    ) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
    if (isPlatformServer(platformId)) {
      state.set(MY_API_KEY, configKey);
      state.set(MY_API_URL, apiUrl);
      state.set(MY_SITE_DOMAIN, siteDomain);
    }
  }
}
