import { Component, OnInit } from '@angular/core';
import { GeoLocationService } from 'src/app/services/GeoLocation.service';
import { ISearchMarkerRequest, MapService, MarkerData } from '../services/map-service';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat = 0;
  lng = 0;
  markers: MarkerData[] = [];

  constructor(private geoService: GeoLocationService, private mapService: MapService) { }

  ngOnInit() {
    this.getCurrentLocation();
  }

  private getCurrentLocation() {
    this.geoService.getCurrentLocation().subscribe((position) => {
      this.lat = position.latitude;
      this.lng = position.longitude;
    })
  }

  public boundsChange(bound: google.maps.LatLngBounds) {
    const request: ISearchMarkerRequest = {
      bottomLeftLat: bound.getSouthWest().lat(),
      bottomLeftLon: bound.getSouthWest().lng(),
      topRightLat: bound.getNorthEast().lat(),
      topRightLon: bound.getNorthEast().lng()
    }

    this.mapService.searchMarkers(request).subscribe(
      (res) => {
        this.markers = res.data;
      },
      err => console.error(err),
      () => console.log('done loading markers')
    );
  }
}