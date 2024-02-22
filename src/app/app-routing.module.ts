import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddressCreateComponent } from "@components/Address/address-create/address-create.component";
import { AddressListComponent } from "@components/Address/address-list/address-list.component";
import { CartDetailsComponent } from "@components/Cart/cart-details/cart-details.component";
import { ProductDetailsComponent } from "@components/Products/product-details/product-details.component";
import { ProductListComponent } from "@components/Products/product-list/product-list.component";
import { NotFoundComponent } from "@components/not-found/not-found.component";
import { OrderCreateComponent } from "@components/order/order-create/order-create.component";
import { OrderDetailsComponent } from "@components/order/order-details/order-details.component";
import { AuthGuard } from "./auth.guard";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

const routes: Routes = [
  { path: "", redirectTo: "landing", pathMatch: "full" },
  {
    path: "signup",
    loadChildren: () =>
      import("./modules/Signup/signup.module").then((m) => m.SignupModule),
    title: "Signup",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./modules/Login/login.module").then((m) => m.LoginModule),
    title: "Login",
  },
  {
    path: "landing",
    loadChildren: () =>
      import("./modules/Landing/landing.module").then((m) => m.LandingModule),
    title: "Landing",
  },
  {
    path: "product-details/:id",
    title: "Detalles del producto",
    component: ProductDetailsComponent,
  },

  {
    path: "product-list",
    component: ProductListComponent,
    title: "Listado de productos",
    children: [
      {
        path: "cart",
        title: "Detalles del Carrito",
        component: CartDetailsComponent,
      },
      {
        path: "address",
        component: AddressListComponent,
        title: "Listado de direcciones",
      },
      {
        path: "address/create",
        component: AddressCreateComponent,
        title: "Crear dirección",
      },
      {
        path: "order",
        component: OrderCreateComponent,
        title: "Orden",
      },
    ],
  },

  {
    path: "admin-cng-dashboard",
    loadChildren: () =>
      import("./modules/AdminCngDashboard/admin-cng-dashboard.module").then(
        (m) => m.AdminCngDashboardModule
      ),
    canActivateChild: [AuthGuard],
    title: "Dashboard admin",
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    title: "Dashboard",
    children: [
      {
        path: "order/:id",
        component: OrderDetailsComponent,
        title: "Detalles de la orden",
      },
    ],
  },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: "enabledBlocking",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
