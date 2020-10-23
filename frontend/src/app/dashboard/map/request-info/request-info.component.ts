import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-map-request-info',
  templateUrl: './request-info.component.html',
  styleUrls: [ './request-info.component.css' ]
})
export class RequestInfoComponent implements OnInit {
  @Input() isShowPanel = false;

  constructor() { }

  ngOnInit() {

  }
}