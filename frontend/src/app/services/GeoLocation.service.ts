import { Injectable } from '@angular/core';

import {  Observable } from 'rxjs';


export interface IGeoLocation {
    latitude: number;
    longitude: number;
}
function getLocation(successCallback: PositionCallback, errorCallback?: PositionErrorCallback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        errorCallback({
            code: -1,
            message: "Geolocation is not supported by this browser.",
            PERMISSION_DENIED: -1,
            POSITION_UNAVAILABLE: -1,
            TIMEOUT: -1
        })
    }
}

@Injectable()
export class GeoLocationService {

    constructor() { }

    /** GET heroes from the server */
    getCurrentLocation(): Observable<IGeoLocation> {
        return new Observable(observer => {
            getLocation((position) => {
                observer.next(position.coords);
                observer.complete();
            }, (error) => {

                observer.error(error)
            })

        })
    }

}
