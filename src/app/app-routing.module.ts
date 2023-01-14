import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "trabajos-details/:id",
    loadChildren: () =>
      import(
        "./components/trabajos/trabajos-details/trabajos-details.module"
      ).then((m) => m.TrabajosDetailsModule),
  },
];

routes.push({ path: "", redirectTo: "index", pathMatch: "full" });
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: "enabledBlocking",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
