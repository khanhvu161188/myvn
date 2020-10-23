import { isPlatformBrowser } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EmeRequestService, ITag } from '../../services/eme-request-service';
import { MarkerData, MarkerDataStatus, MarkerDataRequestStatus } from '../../services/map-service';

@Component({
  selector: 'app-map-request-info',
  templateUrl: './request-info.component.html',
  styleUrls: [ './request-info.component.css' ]
})
export class RequestInfoComponent implements OnInit {
  @Input() isShowPanel = false;
  @Input() selectedRequest: MarkerData | null = null;
  allTags: ITag[] = [];
  priorityText = "";
  priorityClass = "";
  requestStatusText = "";
  requestStatusClass = "";
  @Output() hidePanelEvent = new EventEmitter();

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
      console.log("this.selectedRequest: ", this.selectedRequest);
      this.priorityText = this.getPriorityText(this.selectedRequest.crisisStatus);
      this.priorityClass = this.getPriorityClass(this.selectedRequest.crisisStatus);

      this.requestStatusText = this.getRequestStatusText(this.selectedRequest.requestStatus);
      this.requestStatusClass = this.getRequestStatusClass(this.selectedRequest.requestStatus);
    }
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
}