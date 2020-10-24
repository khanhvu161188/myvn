import { isPlatformBrowser } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { parseTimeToLocalFromNow } from 'src/app/helpers/time.helpers';
import { EmeRequestService, ITag } from '../../services/eme-request-service';
import { MarkerDataStatus, MarkerDataRequestStatus, MarkerDetailData, SearchVolunteersData, SearchVolunteersRequest } from '../../services/map-service';

interface IVolunteerData extends SearchVolunteersData {
  tagDatas: ITag[];
}

@Component({
  selector: 'app-map-request-info',
  templateUrl: './request-info.component.html',
  styleUrls: [ './request-info.component.css' ]
})
export class RequestInfoComponent implements OnInit {
  @Input() isShowPanel = false;
  @Input() selectedRequest: MarkerDetailData | null = null;
  @Input() volunteers: SearchVolunteersData[] = [];
  @Output() hidePanelEvent = new EventEmitter();
  @Output() searchVolunteersEvent = new EventEmitter();
  allTags: ITag[] = [];
  priorityText = "";
  priorityClass = "";
  requestStatusText = "";
  requestStatusClass = "";
  isShowConfirmButton = false;
  informationTime = "";
  localVolunteers: IVolunteerData[] = [];
  selectedTagId: string[] = [];
  isSelectedAllTags = false;
  selectedDistance = 10;

  constructor(private emeRequestService: EmeRequestService) { }

  private getAllTags() {
    this.emeRequestService.tagsList().subscribe((data) => {
      this.allTags = data;
    });
  }

  ngOnInit() {
    this.getAllTags();
  }

  ngOnChanges() {
    if (this.selectedRequest) {
      this.priorityText = this.getPriorityText(this.selectedRequest.crisisStatus);
      this.priorityClass = this.getPriorityClass(this.selectedRequest.crisisStatus);

      this.requestStatusText = this.getRequestStatusText(this.selectedRequest.requestStatus);
      this.requestStatusClass = this.getRequestStatusClass(this.selectedRequest.requestStatus);

      this.isShowConfirmButton = this.selectedRequest.requestStatus === MarkerDataRequestStatus.New;
      this.informationTime = parseTimeToLocalFromNow(this.selectedRequest.createdDateTimeUtc);
    }

    this.localVolunteers = this.volunteers.map(v => {
      return {
        ...v,
        tagDatas: this.allTags.filter(t => v.tags.includes(t.id))
      };
    });
  }

  getPriorityText(status: MarkerDataStatus) {
    switch (status) {
      case MarkerDataStatus.Low:
        return "Thấp";
      case MarkerDataStatus.Medium:
        return "Trung bình";
      case MarkerDataStatus.High:
        return "Cao";
      default:
        return "Cao nhất";
    }
  }

  getPriorityClass(status: MarkerDataStatus) {
    switch (status) {
      case MarkerDataStatus.Low:
        return "low";
      case MarkerDataStatus.Medium:
        return "medium";
      case MarkerDataStatus.High:
        return "high";
      default:
        return "critical";
    }
  }

  getRequestStatusText(status: MarkerDataRequestStatus) {
    switch (status) {
      case MarkerDataRequestStatus.New:
        return "Chưa xác thực";
      case MarkerDataRequestStatus.Verified:
        return "Đã xác thực";
      case MarkerDataRequestStatus.Processing:
        return "Đang xử lý";
      case MarkerDataRequestStatus.Finished:
        return "Hoàn tất";
      default:
        return "Đã mở lại";
    }
  }

  getRequestStatusClass(status: MarkerDataRequestStatus) {
    switch (status) {
      case MarkerDataRequestStatus.New:
        return "new";
      case MarkerDataRequestStatus.Verified:
        return "verified";
      case MarkerDataRequestStatus.Processing:
        return "processing";
      case MarkerDataRequestStatus.Finished:
        return "finished";
      default:
        return "reopened";
    }
  }

  public hidePanel() {
    this.hidePanelEvent.emit();
  }

  public showTagsOfVolunteersAsText(volunteer: IVolunteerData) {
    return volunteer.tagDatas.map(v => v.tagValue).join(", ");
  }

  public onSelectAllTagOfVolunteers() {
    if (!this.isSelectedAllTags) {
      this.isSelectedAllTags = true;
      this.selectedTagId = this.allTags.map(t => t.id);
    } else {
      this.isSelectedAllTags = false;
      this.selectedTagId = [];
    }

    const searchVolunteersRequest: SearchVolunteersRequest = {
      distance: this.selectedDistance,
      startLat: this.selectedRequest.lat,
      startLon: this.selectedRequest.lon,
      status: [],
      tagIds: this.isSelectedAllTags || this.selectedTagId.length === 0
      ? [] : this.selectedTagId
    };
    this.searchVolunteersEvent.emit(searchVolunteersRequest);
  }

  public onFilterTagsOfVolunteers(tagId: string) {
    if (this.selectedTagId.includes(tagId)) {
      const tagIdIndex = this.selectedTagId.indexOf(tagId);
      this.selectedTagId.splice(tagIdIndex, 1);
    } else {
      this.selectedTagId.push(tagId);
    }

    if (this.selectedTagId.length === this.allTags.length) {
      this.isSelectedAllTags = true;
    } else {
      this.isSelectedAllTags = false;
    }

    const searchVolunteersRequest: SearchVolunteersRequest = {
      distance: this.selectedDistance,
      startLat: this.selectedRequest.lat,
      startLon: this.selectedRequest.lon,
      status: [],
      tagIds: this.isSelectedAllTags || this.selectedTagId.length === 0
      ? [] : this.selectedTagId
    };
    this.searchVolunteersEvent.emit(searchVolunteersRequest);
  }

  public onSelectDistance(distance: number) {
    this.selectedDistance = distance;

    const searchVolunteersRequest: SearchVolunteersRequest = {
      distance: this.selectedDistance,
      startLat: this.selectedRequest.lat,
      startLon: this.selectedRequest.lon,
      status: [],
      tagIds: this.isSelectedAllTags || this.selectedTagId.length === 0
      ? [] : this.selectedTagId
    };
    this.searchVolunteersEvent.emit(searchVolunteersRequest);
  }
}