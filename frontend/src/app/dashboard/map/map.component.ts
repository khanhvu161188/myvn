import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GeoLocationService } from 'src/app/services/GeoLocation.service';
import { AddRequestDialogComponent } from '../add-request-dialog/add-request-dialog.component';
import { ISearchMarkerRequest, MapService, MarkerData, MarkerDetailData } from '../services/map-service';

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
  searchRq?: Subscription;
  x = 0;
  y = 0;
  ctxLat = 0;
  ctxLng = 0;
  isShowContextMenu = false;
  isShowPanel = false;
  selectedRequest: MarkerDetailData | null = null;

  constructor(private geoService: GeoLocationService, private mapService: MapService, private _ngZone: NgZone, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getCurrentLocation();
  }
  public mapReady(map: google.maps.Map) {

    map.addListener("rightclick", (e) => {
      this._ngZone.run(() => {
        this.mapRightClick(e);
      })
    });
    map.addListener("click", (e) => {
      this._ngZone.run(() => {
        this.hideContextMenu();
      })
    });
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
        console.error(err)
      },
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

    this.hideContextMenu();
  }

  public mapRightClick(event: google.maps.MouseEvent) {
    console.log((event as any).pixel);
    // alert(`right click to ${event.latLng.lat()}/${event.latLng.lng()}`);
    this.x = (event as any).pixel.x + 20;
    this.y = (event as any).pixel.y;

    this.ctxLat = event.latLng.lat();
    this.ctxLng = event.latLng.lng();

    this.isShowContextMenu = true;
  }

  private hideContextMenu() {
    this.isShowContextMenu = false;
  }

  public onAddMissingPlace({ lat, lng }: { lat: number, lng: number }) {
    this.hideContextMenu();
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddRequestDialogComponent, {
      width: '500px',
      data: {
        lat: this.ctxLat,
        lng: this.ctxLng
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  public clickedMarker(marker: MarkerData) {
    this.showRequestInfoPanel(marker);
  }

  showRequestInfoPanel(marker: MarkerData) {
    this.isShowPanel = true;

    this.mapService.getMarkerDetail(marker.id).subscribe(
      (res) => {
        this.selectedRequest = res;
      },
      err => {
        console.error(err)
      },
      () => {
        console.log('done loading marker detail');
      }
    );
  }

  public hideRequestInfoPanel() {
    this.isShowPanel = false;
    this.selectedRequest = null;
  }
}