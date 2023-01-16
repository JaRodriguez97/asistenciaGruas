import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ContactanosComponent } from "@components/contactanos/contactanos.component";
import { IndexComponent } from "@components/index/index.component";
import { NosotrosComponent } from "@components/nosotros/nosotros.component";
import { ServiciosComponent } from "@components/servicios/servicios.component";
import { TestimoniosComponent } from "@components/testimonios/testimonios.component";
import { TrabajosComponent } from "@components/trabajos/trabajos.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ContactService } from "@service/Contact/contact.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

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
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ContactService],
  bootstrap: [AppComponent],
})
export class AppModule {}
