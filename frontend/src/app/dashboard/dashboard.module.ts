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
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { MatListModule } from '@angular/material/list';
import { AddRequestDialogComponent } from './add-request-dialog/add-request-dialog.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';


import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { EmeRequestService } from './services/eme-request-service';
import { AddRequestTagsComponent } from './add-request-tags/add-request-tags.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AgmCoreModule.forRoot(),
    HttpClientModule,
    AgmMarkerClustererModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule
  ],
  declarations: [
    DashboardComponent,
    MapComponent,
    ContextMenuComponent,
    AddRequestDialogComponent,
    AddRequestTagsComponent,
    AddRequestTagsComponent
  ],

  entryComponents: [
    MapComponent, AddRequestDialogComponent
  ],

  providers: [
    {
      provide: WindowRef,
      useClass: WindowLocalRef
    },
    GeoLocationService, { provide: MapsAPILoader, useClass: ModifierLazyMapsAPILoader },
    MapService,
    EmeRequestService
  ]
})
export class DashboardModule { }
