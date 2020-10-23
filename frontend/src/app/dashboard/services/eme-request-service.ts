import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EnvBrowserService, MY_API_URL } from 'src/app/services/Env.service';
import { map } from 'rxjs/operators';
export interface ITag {
  id?: string, //if new tag, then pass id = empty
  tagValue: string;
}
export interface ITagResponse {
  value: string;
  colorCode: null;
  isDeleted: boolean;
  id: string;
  createdDateTimeUtc: Date;
  updatedDateTimeUtc: Date;
}
export interface SearchMarkerResponse {
  data: ITag[];
}
export enum CrisisStatus {
  Low = "10", Medium = "20", High = "30", Critical = "40"
}

export interface DialogData {
  crisisStatus: number;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  instructionDetail: string;
  personNumber: number;
  lon: number;
  lat: number;
  tags: ITag[];
}

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class EmeRequestService {

  private apiUrl: string;
  constructor(private http: HttpClient, envService: EnvBrowserService) {
    this.apiUrl = envService.get(MY_API_URL);
  }

  // Uses http.get() to load data from a single API endpoint
  tagsList() {

    return this.http.get<ITagResponse[]>(`${this.apiUrl}/pod/v1/misc/tags/list`).pipe(
      map(
        data => data.map(
          ({ id, value }) => ({ id, tagValue: value })
        )
      )
    );
  }

  create(request: DialogData) {
    return this.http.post<string>(`${this.apiUrl}/pod/v1/request`, request);
  }
}