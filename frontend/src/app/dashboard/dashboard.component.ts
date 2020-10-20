import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  public isBrowser = isPlatformBrowser(this.platformId);
  constructor(@Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit() {
  }

}
