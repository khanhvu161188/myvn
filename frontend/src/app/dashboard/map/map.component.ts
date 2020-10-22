import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { GeoLocationService } from 'src/app/services/GeoLocation.service';
import { MapService, MarkerData, SearchMarkerResponse } from '../services/map-service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: [ './map.component.css' ]
})
export class MapComponent implements OnInit {
  lat = 0;
  lng = 0;
  markers: MarkerData[] = [];
  isShowPanel = false;

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
    const request = {
      bottomLeftLat: 15.09220550540362,
      bottomLeftLon: 108.17582227979761,
      topRightLat: 15.268479893074357,
      topRightLon: 108.83500196729761
    };

    this.mapService.searchMarkers(request).subscribe(
      (res: SearchMarkerResponse) => {
        this.markers = res.data;
      },
      err => console.error(err),
      () => console.log('done loading markers')
      );
  }

  clickedMarker(marker: MarkerData) {
    this.showRequestInfoPanel();
  }

  mapClicked($event: MouseEvent) {
    console.log($event);
    this.hideRequestInfoPanel();
  }

  showRequestInfoPanel() {
    this.isShowPanel = true;
  }

  hideRequestInfoPanel() {
    this.isShowPanel = false;
  }
}