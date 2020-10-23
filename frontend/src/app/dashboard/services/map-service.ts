import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EnvBrowserService, MY_API_URL } from 'src/app/services/Env.service';

export interface MarkerData {
  id: string;
  lat: number;
  lon: number;
  crisisStatus: MarkerDataStatus;
  requestStatus: MarkerDataRequestStatus;
}

export enum MarkerDataStatus {
  Low = 0,
  Medium = 1,
  High = 2,
  Critical = 3
}

export enum MarkerDataRequestStatus {
  New = 0, //when a request created, its New status.
  Verified = 1, //When someone contact the request's owner to verify and then change to this status so that other can help
  Processing = 2, //When someone is processing this request
  Finished = 3, //When request is completely solved
  Reopen = 4 //When something wrong.
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