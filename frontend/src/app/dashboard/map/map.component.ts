import {Component, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {GeoLocationService} from 'src/app/services/GeoLocation.service';
import {AddRequestDialogComponent} from '../add-request-dialog/add-request-dialog.component';
import {ISearchMarkerRequest, MapService, MarkerData, SearchVolunteersData, SearchVolunteersRequest} from '../services/map-service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
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
  selectedRequest: MarkerData | null = null;
  volunteers: SearchVolunteersData[] = [];
  currentMap: google.maps.Map = null;

  constructor(private geoService: GeoLocationService, private mapService: MapService, private _ngZone: NgZone, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getCurrentLocation();
  }

  public mapReady(map: google.maps.Map) {
    this.currentMap = map;

    map.addListener('rightclick', (e) => {
      this._ngZone.run(() => {
        this.mapRightClick(e);
      });
    });
  }

  private getCurrentLocation() {
    this.geoService.getCurrentLocation().subscribe((position) => {
      this.lat = position.latitude;
      this.lng = position.longitude;
    });
  }

  public mapIdle() {
    if (this.searchRq) {
      this.searchRq.unsubscribe();
    }
    if (!this.selectedRequest) {
      this.searchRq = this.mapService.searchMarkers(this.request).subscribe(
        (res) => {
          // this.isSearch = true;
          const news = res.data.filter((data) => this.markers.findIndex(old => old.id === data.id) === -1);
          this.markers = [...this.markers, ...news];
        },
        err => {
          this.markers = [];
          console.error(err);
        },
        () => {

          console.log('done loading markers');
        }
      );
    }
  }

  public boundsChange(bound: google.maps.LatLngBounds) {
    this.request = {
      bottomLeftLat: bound.getSouthWest().lat(),
      bottomLeftLon: bound.getSouthWest().lng(),
      topRightLat: bound.getNorthEast().lat(),
      topRightLon: bound.getNorthEast().lng()
    };

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

  public onAddMissingPlace({lat, lng}: { lat: number, lng: number }) {
    this.hideContextMenu();
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddRequestDialogComponent, {
      width: '500px',
      data: {
        lat: this.ctxLat,
        lon: this.ctxLng
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  public clickedMarker(marker: MarkerData) {
    this.selectedRequest = marker;
    this.hideRequestMarkersExcept();
    this.showRequestInfoPanel();
  }

  public hideRequestMarkersExcept() {
    this.markers.map(m => {
      if (m.id !== this.selectedRequest.id) {
        m.visible = false;
      }
      return m;
    });
  }

  public unHideRequestMarkers() {
    this.markers.map(m => {
      m.visible = true;
      return m;
    });
  }

  public clickedVolunteer(volunteer: SearchVolunteersData) {
    // panTo included animation
    this.currentMap.panTo({lat: volunteer.lat, lng: volunteer.lon});
  }

  showRequestInfoPanel() {
    // panTo included animation
    this.currentMap.panTo({lat: this.selectedRequest.lat, lng: this.selectedRequest.lon});
    this.isShowPanel = true;

    this.mapService.getMarkerDetail(this.selectedRequest.id).subscribe(
      (res) => {
        // this.selectedRequest = res;
        // this.mapIdle();

        // search volunteers by marker
        const searchVolunteersRequest: SearchVolunteersRequest = {
          distance: 10,
          startLat: res.lat,
          startLon: res.lon,
          status: [],
          tagIds: []
        };
        this.searchVolunteers(searchVolunteersRequest);
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('done loading marker detail');
      }
    );
  }

  public searchVolunteers(searchVolunteersRequest: SearchVolunteersRequest) {
    this.mapService.searchVolunteers(searchVolunteersRequest).subscribe(
      (resVolunteers) => {
        this.volunteers = resVolunteers.data;
      },
      errVolunteers => {
        console.log('Search volunteers failed: ', errVolunteers);
      },
      () => {
        console.log('done loading volunteers');
      }
    );
  }

  public onMapClick() {
    this.hideContextMenu();

    if (this.selectedRequest) {
      this.onHidePanel();
    }
  }

  public onHidePanel() {
    this.unHideRequestMarkers();
    this.selectedRequest = null;
    this.volunteers = [];
    this.isShowPanel = false;
    this.mapIdle();
  }
}
