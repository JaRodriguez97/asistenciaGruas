import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IndexComponent } from "./components/index/index.component";
import { NosotrosComponent } from "./components/nosotros/nosotros.component";
import { ServiciosComponent } from "./components/servicios/servicios.component";
import { TestimoniosComponent } from "./components/testimonios/testimonios.component";
import { ContactanosComponent } from "./components/contactanos/contactanos.component";
import { TrabajosComponent } from "./components/trabajos/trabajos.component";

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NosotrosComponent,
    ServiciosComponent,
    TestimoniosComponent,
    ContactanosComponent,
    TrabajosComponent,
  ],
  imports: [
    NgxSpinnerModule,
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
