import { LazyMapsAPILoader,  ɵd as DocumentRef } from '@agm/core';
import { Inject, Injectable, InjectionToken, LOCALE_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { WindowRef } from './WindowRef.service';

export const LAZY_MAPS_API_CONFIG_KEY = new InjectionToken<string>('LAZY_MAPS_API_CONFIG_KEY');
export const MY_API_KEY = makeStateKey('my_apiKey');

@Injectable()
export class ModifierLazyMapsAPILoader extends LazyMapsAPILoader {
    constructor(
        w: WindowRef,
        d: DocumentRef,
        @Inject(LOCALE_ID) localeId: string,
        state: TransferState) {
        super({ apiKey: state.get(MY_API_KEY, "") }, w, d, localeId);
    }
}