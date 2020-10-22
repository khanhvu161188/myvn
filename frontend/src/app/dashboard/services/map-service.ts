import {Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { Observable } from "rxjs/Observable";
import { environment } from 'src/environments/environment';

export interface MarkerData {
  id: string;
  lat: number;
  lon: number;
  crisisStatus: number;
  requestStatus: number;
}

export interface SearchMarkerResponse {
  data: MarkerData[];
}

export interface SearchMarkerRequest {
  bottomLeftLat: number;
  bottomLeftLon: number;
  topRightLat: number;
  topRightLon: number;
}

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class MapService {

    constructor(private http:HttpClient) {}

    // Uses http.get() to load data from a single API endpoint
    searchMarkers(request: SearchMarkerRequest) {
        return this.http.post<SearchMarkerResponse>(`${environment.domain}/pod/v1/request/searchinbound`, request);
    }
}