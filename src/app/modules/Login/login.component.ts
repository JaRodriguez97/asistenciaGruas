import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthUserService } from "@services/AuthUser/authUser.service";
import { PublicService } from "@services/Public/public.service";
import { GlobalErrorHandlerService } from "@services/global-error-handler/global-error-handler.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  numeroTelefono!: number;
  // email!: string;
  password!: string;
  rememberMe: boolean = false;
  token!: string;

  constructor(
    private route: Router,
    public publicService: PublicService,
    private authUserService: AuthUserService,
    private globalErrorHandlerService: GlobalErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem("tokenCNG")!;
    if (this.token) this.route.navigate(["/product-list"]);

    setTimeout(() => this.publicService.hide(), 1000);
  }

  onSubmit() {
    this.publicService.show();

    if (!this.numeroTelefono || !this.password) {
      // if (!this.email || !this.password) {
      this.globalErrorHandlerService
        .handleError({
          error: {
            mensaje: "Por favor, complete todos los campos obligatorios.",
          },
          status: 400,
        })
        .then(() => this.publicService.hide());

      return;
    }

    let form = {
      // email: this.email,
      numeroTelefono: this.numeroTelefono,
      contraseña: this.password,
      checkbox: this.rememberMe,
    };

    this.authUserService.getLoginUser(form).subscribe({
      next: (res) => {
        let route = "/product-list";

        this.authUserService.isAdmin = res.rol == "admin";

        localStorage.setItem("tokenCNG", res.token);

        if (this.authUserService.isAdmin) route = "/admin-cng-dashboard";
        console.log(
          "🚀 ~ this.authUserService.getLoginUser ~ this.authUserService.isAdmin:",
          this.authUserService.isAdmin
        );

        setTimeout(() => this.route.navigate([route]), 1000);
      },
      error: (err) =>
        this.globalErrorHandlerService
          .handleError(err)
          .then(() => this.publicService.hide()),
      complete: () =>
        Swal.fire({
          icon: "success",
          title: "Bienvenid@",
          // text: res.message,
          showConfirmButton: true,
        }),
    });
  }
}
