import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrabajosDetailsComponent } from './trabajos-details.component';

const routes: Routes = [{ path: '', component: TrabajosDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrabajosDetailsRoutingModule { }
