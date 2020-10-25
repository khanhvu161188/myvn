import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvComponent } from './env.component';
import { EnvRoutingModule } from './env-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EnvRoutingModule,
  ],
  declarations: [
    EnvComponent,
  ],
})
export class EnvModule { }
