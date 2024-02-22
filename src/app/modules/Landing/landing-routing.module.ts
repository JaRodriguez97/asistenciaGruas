import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddressCreateComponent } from "@components/Address/address-create/address-create.component";
import { AddressListComponent } from "@components/Address/address-list/address-list.component";
import { CartDetailsComponent } from "@components/Cart/cart-details/cart-details.component";
import { OrderCreateComponent } from "@components/order/order-create/order-create.component";
import { LandingComponent } from "./landing.component";

const routes: Routes = [
  {
    path: "",
    component: LandingComponent,
    children: [
      {
        path: "cart",
        component: CartDetailsComponent,
        title: "Detalles del Carrito",
      },
      {
        path: "order",
        component: OrderCreateComponent,
        title: "Crear Orden",
      },
      {
        path: "address",
        component: AddressListComponent,
        title: "Lista de Direcciones",
      },
      {
        path: "address/create",
        component: AddressCreateComponent,
        title: "Crear Dirección",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
