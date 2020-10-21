import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { GeoLocationService } from 'src/app/services/GeoLocation.service';
import { MapService } from '../services/map-service';

interface MarkerData {
  id: string;
  lat: number;
  lon: number;
  crisisStatus: number;
  requestStatus: number;
}

interface SearchMarkerResponse {
  data: MarkerData[];
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: [ './map.component.css' ]
})
export class MapComponent implements OnInit {
  lat = 0;
  lng = 0;
  markers: MarkerData[] = [];

  constructor(private geoService: GeoLocationService, private mapService: MapService) { }

  ngOnInit() {
    this.getCurrentLocation();
    this.showMarkersOnMap();
  }

  private getCurrentLocation() {
    this.geoService.getCurrentLocation().subscribe((position) => {
      this.lat = position.latitude;
      this.lng = position.longitude;
    })
  }

  private showMarkersOnMap() {
    this.mapService.searchMarkers().subscribe(
      (res: SearchMarkerResponse) => {
        this.markers = res.data;
      },
      err => console.error(err),
      () => console.log('done loading markers')
      );
  }
}