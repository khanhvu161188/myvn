import { Injectable, InjectionToken } from '@angular/core';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';

export const MY_API_URL_TOKEN = new InjectionToken<string>('MY_API_URL');
export const MY_API_URL = makeStateKey('MY_API_URL');
export const MY_SITE_DOMAIN = makeStateKey('MY_SITE_DOMAIN');

@Injectable()
export class EnvBrowserService {

    constructor(
        private state: TransferState) {
    }

    get(key: StateKey<void>) {
        return this.state.get(key, '');
    }
}
