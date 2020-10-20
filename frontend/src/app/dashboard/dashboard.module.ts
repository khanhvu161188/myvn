import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AgmCoreModule } from '@agm/core';
import { WindowLocalRef, WindowRef } from '../services/WindowRef.service';
import { GeoLocationService } from '../services/GeoLocation.service';
import { MapComponent } from './map/map.component';
@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyACOLjTUMYHC2v02KnVKBEbX1-1oo4oTS0'
    })
  ],
  declarations: [
    DashboardComponent,
    MapComponent
  ],
  providers: [
    {
      provide: WindowRef,
      useClass: WindowLocalRef
    },
    GeoLocationService
  ]
})
export class DashboardModule {}
