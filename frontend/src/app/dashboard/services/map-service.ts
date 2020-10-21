import {Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { Observable } from "rxjs/Observable";

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class MapService {

    constructor(private http:HttpClient) {}

    // Uses http.get() to load data from a single API endpoint
    searchMarkers() {
      const request = {
        bottomLeftLat: 15.09220550540362,
        bottomLeftLon: 108.17582227979761,
        topRightLat: 15.268479893074357,
        topRightLon: 108.83500196729761
      };

        return this.http.post("http://staging.api.thamhoa.vn/pod/v1/request/searchinbound", request);
    }
}