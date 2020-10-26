import { NgModule } from '@angular/core';
import {AuthService} from '../auth/services/authService';

@NgModule({
  providers: [
    AuthService
  ]
})
export class SharedModule { }
