import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { AdminCngDashboardComponent } from "./admin-cng-dashboard.component";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CategoriasCreateComponent } from "@components/categorias/categorias-create/categorias-create.component";
import { ProductCreateComponent } from "@components/Products/Product-create/product-create.component";
import { OrderListComponent } from "@components/order/order-list/order-list.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { NgsRevealModule } from "ngx-scrollreveal";
import { MatMenuModule } from "@angular/material/menu";
import { MatSortModule } from "@angular/material/sort";

import { AdminCngDashboardRoutingModule } from "./admin-cng-dashboard-routing.module";
import { DashboardComponent } from "@components/dashboard/dashboard.component";

@NgModule({
  declarations: [
    CategoriasCreateComponent,
    ProductCreateComponent,
    AdminCngDashboardComponent,
    OrderListComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    AdminCngDashboardRoutingModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    NgsRevealModule,
    MatMenuModule,
    MatSortModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminCngDashboardModule {}
