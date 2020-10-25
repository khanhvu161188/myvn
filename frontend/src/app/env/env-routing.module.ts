import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnvComponent } from './env.component';

const routes: Routes = [
  {
    path: '',
    component: EnvComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvRoutingModule { }
