import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ContactanosComponent } from "@components/contactanos/contactanos.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { AddressCreateComponent } from "@components/Address/address-create/address-create.component";
import { AddressListComponent } from "@components/Address/address-list/address-list.component";
import { CartDetailsComponent } from "@components/Cart/cart-details/cart-details.component";
import { ProductListComponent } from "@components/Products/product-list/product-list.component";
import { OrderCreateComponent } from "@components/order/order-create/order-create.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { LandingRoutingModule } from "./landing-routing.module";
import { LandingComponent } from "./landing.component";
import { IndexComponent } from "@components/index/index.component";
import { NosotrosComponent } from "@components/nosotros/nosotros.component";
import { ServiciosComponent } from "@components/servicios/servicios.component";
import { TestimoniosComponent } from "@components/testimonios/testimonios.component";
import { TrabajosComponent } from "@components/trabajos/trabajos.component";

@NgModule({
  declarations: [
    LandingComponent,
    ContactanosComponent,
    IndexComponent,
    NosotrosComponent,
    ServiciosComponent,
    TestimoniosComponent,
    TrabajosComponent,

    ProductListComponent,
    CartDetailsComponent,
    OrderCreateComponent,
    AddressListComponent,
    AddressCreateComponent,
  ],
  imports: [
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    CommonModule,
    LandingRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    FontAwesomeModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingModule {}
