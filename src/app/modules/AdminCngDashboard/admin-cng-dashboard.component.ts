import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";
import { Router } from "@angular/router";
import { GlobalErrorHandlerService } from "@services/global-error-handler/global-error-handler.service";
import { AuthUserService } from "@services/AuthUser/authUser.service";
import { PublicService } from "@services/Public/public.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-admin-cng-dashboard",
  templateUrl: "./admin-cng-dashboard.component.html",
  styleUrls: ["./admin-cng-dashboard.component.css"],
})
export class AdminCngDashboardComponent implements OnInit {
  sections: string[] = [
    "categorias",
    "pedidos",
    "productos",
    // 'usuarios',
  ];
  selectedItem: number | null = null;
  showFiller: boolean = false;
  token!: string;
  title: string = "Dashboard";

  segmentos!: string[];

  @ViewChild(MatDrawer, { static: true }) drawer!: MatDrawer;

  constructor(
    private route: Router,
    public publicService: PublicService,
    private authUserService: AuthUserService,
    private globalErrorHandlerService: GlobalErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem("tokenCNG")!;

    if (!this.token)
      this.globalErrorHandlerService.handleError({ status: 401 });

    this.segmentos = this.route.url.split("/");

    this.getValidToken();

    if (this.publicService.isMobile && this.drawer.opened) this.clickToggle();
  }

  getValidToken() {
    this.authUserService.getValidToken(this.token).subscribe({
      next: () => {
        console.info("Usuario Administrador Autenticado");

        this.sections.forEach((s, i) =>
          this.segmentos[2] == s ? this.onItemClick(i, s) : null
        );
      },
      error: (e) => this.globalErrorHandlerService.handleError(e),
      complete: () => {
        if (this.segmentos.length <= 2)
          setTimeout(() => this.publicService.hide(), 1000);
      },
    });
  }

  clickToggle() {
    this.drawer.toggle();
  }

  onItemClick(index: number, section: string) {
    this.publicService.show();

    this.title = section;
    this.selectedItem = index;

    if (this.publicService.isMobile) this.clickToggle();

    this.route.navigate([`/admin-cng-dashboard/${section}`]);
  }

  sectionSelected() {
    let obj: any = {};

    if (this.title) obj[this.title] = true;

    return obj;
  }

  closedSesion() {
    Swal.fire({
      title: "¿Estás seguro de que deseas cerrar sesión?",
      text: "Serás redirigido al Login.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then(({ isConfirmed }) =>
      isConfirmed
        ? this.route
            .navigate(["/login"])
            .then(() => localStorage.removeItem("tokenCNG"))
        : null
    );
  }
}
