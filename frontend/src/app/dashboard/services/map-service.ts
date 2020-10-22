import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EnvBrowserService, MY_API_URL } from 'src/app/services/Env.service';
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

export interface ISearchMarkerRequest {
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

  private apiUrl: string;
  constructor(private http: HttpClient, private envService: EnvBrowserService) { 
    this.apiUrl = envService.get(MY_API_URL);
  }

  // Uses http.get() to load data from a single API endpoint
  searchMarkers(request: ISearchMarkerRequest) {

    return this.http.post<SearchMarkerResponse>(`${this.apiUrl}/pod/v1/request/searchinbound`, request);
  }
}