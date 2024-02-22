import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductCreateComponent } from "@components/Products/Product-create/product-create.component";
import { CategoriasCreateComponent } from "@components/categorias/categorias-create/categorias-create.component";
import { DashboardComponent } from "@components/dashboard/dashboard.component";
import { OrderListComponent } from "@components/order/order-list/order-list.component";
import { UserCreateComponent } from "@components/user/user-create/user-create.component";
import { AdminCngDashboardComponent } from "./admin-cng-dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: AdminCngDashboardComponent,
    children: [
      {
        path: "",
        component: DashboardComponent,
      },
      {
        path: "productos",
        component: ProductCreateComponent,
      },
      {
        path: "categorias",
        component: CategoriasCreateComponent,
      },
      {
        path: "usuarios",
        component: UserCreateComponent,
      },
      {
        path: "pedidos",
        component: OrderListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminCngDashboardRoutingModule {}
