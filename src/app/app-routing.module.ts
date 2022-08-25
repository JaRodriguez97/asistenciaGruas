import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IndexComponent } from "./components/index/index.component";
import { ContactanosComponent } from "./components/contactanos/contactanos.component";
import { NosotrosComponent } from "./components/nosotros/nosotros.component";
import { ServiciosComponent } from "./components/servicios/servicios.component";
import { TestimoniosComponent } from "./components/testimonios/testimonios.component";

const routes: Routes = [];

routes.push(
  { path: "", redirectTo: "index", pathMatch: "full" },
  { path: "portafolio", redirectTo: "index", pathMatch: "full" },
  {
    path: "index",
    component: IndexComponent, // canActivateChild: [AuthGuard],
  },
  { path: "nosotros", component: NosotrosComponent },
  { path: "servicios", component: ServiciosComponent },
  { path: "testimonios", component: TestimoniosComponent },
  { path: "contactanos", component: ContactanosComponent }
);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
