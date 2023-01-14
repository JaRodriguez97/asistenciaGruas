import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrabajosDetailsRoutingModule } from './trabajos-details-routing.module';
import { TrabajosDetailsComponent } from './trabajos-details.component';


@NgModule({
  declarations: [
    TrabajosDetailsComponent
  ],
  imports: [
    CommonModule,
    TrabajosDetailsRoutingModule
  ]
})
export class TrabajosDetailsModule { }
