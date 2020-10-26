import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EnvBrowserService, MY_API_URL } from 'src/app/services/Env.service';
import { map } from 'rxjs/operators';
import { ITag } from './eme-request-service';

export interface MarkerData {
  id: string;
  lat: number;
  lon: number;
  crisisStatus: MarkerDataStatus;
  requestStatus: MarkerDataRequestStatus;
  tags: string[];
  visible: boolean;
}

export interface GetMarkerDetailResponse {
  lat: number;
  lon: number;
  crisisStatus: MarkerDataStatus;
  requestStatus: MarkerDataRequestStatus;
  tags: ITag[];
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  instructionDetail: string;
  additionInfo: string;
  personNumber: number;
  contactAddress: string;
  createdDateTimeUtc: string;
}

export interface MarkerDetailData extends GetMarkerDetailResponse {
  id: string;
}

export enum MarkerDataStatus {
  Low = 10,
  Medium = 20,
  High = 30,
  Critical = 40
}

export enum MarkerDataRequestStatus {
  New = 0, //when a request created, its New status.
  Verified = 10, //When someone contact the request's owner to verify and then change to this status so that other can help
  Processing = 20, //When someone is processing this request
  Finished = 30, //When request is completely solved
  Reopen = 40 //When something wrong.
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

export interface SearchVolunteersRequest {
  startLat: number;
  startLon: number;
  distance: number;
  tagIds: string[];
  status: number[];
}

export interface SearchVolunteersData {
  id: string;
  lat: number;
  lon: number;
  status: VolunteersStatus;
  tags: string[];
  distance: number;
  phone: string;
  name: string;
}

export interface SearchVolunteersResponse {
  data: SearchVolunteersData[];
}


export enum VolunteersStatus {
  Available = 10,
  InProgress = 20,
  NotAvailable = 30,
  Mia = 999
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

  getMarkerDetail(id: string) {
    return this.http.get<GetMarkerDetailResponse>(`${this.apiUrl}/pod/v1/request/${id}`).pipe(
      map(
        data => {
          return {
            ...data,
            id
          };
        }
      )
    );
  }

  searchVolunteers(request: SearchVolunteersRequest) {
    return this.http.post<SearchVolunteersResponse>(`${this.apiUrl}/pod/v1/volunteer/search`, request);
  }
}
