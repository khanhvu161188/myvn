import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { GeoLocationService } from 'src/app/services/GeoLocation.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: [ './map.component.css' ]
})
export class MapComponent implements OnInit {
  lat = 0;
  lng = 0;
  constructor(private geoService: GeoLocationService) { }

  ngOnInit() {
    this.getCurrentLocation();
  }

  private getCurrentLocation() {
    this.geoService.getCurrentLocation().subscribe((position) => {
      this.lat = position.latitude;
      this.lng = position.longitude;
    })
  }

}
