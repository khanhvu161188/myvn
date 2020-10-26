import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvComponent } from './env.component';
import { EnvRoutingModule } from './env-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    EnvRoutingModule,
    SharedModule,
  ],
  declarations: [
    EnvComponent,
  ],
})
export class EnvModule { }
