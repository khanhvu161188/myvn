import {  ɵc as WindowRef } from '@agm/core';
import { Injectable } from '@angular/core';
function _window(): any {
    console.log(`get window`, window);
    return window;
}
@Injectable()
export class WindowLocalRef extends WindowRef {
    getNativeWindow(): any {
        return _window();
    }
}

export {  ɵc as WindowRef } from '@agm/core';