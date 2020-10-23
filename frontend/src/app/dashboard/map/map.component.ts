import { AgmMap } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription, timer } from 'rxjs';
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
  request: ISearchMarkerRequest;
  searchRq?: Subscription ;
  isShowPanel = true;

  constructor(private geoService: GeoLocationService, private mapService: MapService) {
  }

  ngOnInit() {
    this.getCurrentLocation();
  }

  private getCurrentLocation() {
    this.geoService.getCurrentLocation().subscribe((position) => {
      this.lat = position.latitude;
      this.lng = position.longitude;
    })
  }

  public mapIdle() {
    if (this.searchRq) {
      this.searchRq.unsubscribe();
    }
    this.searchRq = this.mapService.searchMarkers(this.request).subscribe(
      (res) => {
        // this.isSearch = true;
        const news = res.data.filter((data) => this.markers.findIndex(old => old.id === data.id) === -1);
          this.markers = [...this.markers, ...news];
      },
      err => {
        this.markers = [];
        console.error(err)},
      () => {

        console.log('done loading markers');
      }
    );
  }

  public boundsChange(bound: google.maps.LatLngBounds) {
    this.request = {
      bottomLeftLat: bound.getSouthWest().lat(),
      bottomLeftLon: bound.getSouthWest().lng(),
      topRightLat: bound.getNorthEast().lat(),
      topRightLon: bound.getNorthEast().lng()
    }


  }

  public clickedMarker(marker: MarkerData) {
    this.showRequestInfoPanel();
  }

  public mapClicked($event: MouseEvent) {
    this.hideRequestInfoPanel();
  }

  showRequestInfoPanel() {
    this.isShowPanel = true;
  }

  hideRequestInfoPanel() {
    this.isShowPanel = false;
  }
}