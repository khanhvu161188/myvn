import { NgModule, ValueProvider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { WindowLocalRef, WindowRef } from '../services/WindowRef.service';
import { GeoLocationService } from '../services/GeoLocation.service';
import { MapComponent } from './map/map.component';
import { ModifierLazyMapsAPILoader } from '../services/ModifierLazyMapsAPILoader';
import { HttpClientModule } from '@angular/common/http';
import { MapService } from './services/map-service';
import { AgmMarkerClustererModule } from '@agm/markerclusterer';
import { RequestInfoComponent } from './map/request-info/request-info.component';
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AgmCoreModule.forRoot(),
    HttpClientModule,
    AgmMarkerClustererModule,
    MatIconModule
  ],
  declarations: [
    DashboardComponent,
    MapComponent,
    RequestInfoComponent
  ],
  providers: [
    {
      provide: WindowRef,
      useClass: WindowLocalRef
    },
    GeoLocationService, {provide: MapsAPILoader, useClass: ModifierLazyMapsAPILoader},
    MapService
  ]
})
export class DashboardModule { }
