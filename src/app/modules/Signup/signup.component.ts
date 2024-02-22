import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthUserService } from "@services/AuthUser/authUser.service";
import { PublicService } from "@services/Public/public.service";
import { GlobalErrorHandlerService } from "@services/global-error-handler/global-error-handler.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public publicService: PublicService,
    private golbalError: GlobalErrorHandlerService,
    private route: Router,
    private authUserService: AuthUserService
  ) {
    this.registrationForm = this.formBuilder.group({
      nombres: ["", Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      numeroTelefono: ["", [Validators.minLength(10), Validators.required]],
      contraseña: ["", [Validators.minLength(8), Validators.required]],
    });
  }

  ngOnInit(): void {
    setTimeout(() => this.publicService.hide(), 1000);
  }

  onSubmit() {
    this.publicService.show();

    if (!this.registrationForm.valid)
      this.golbalError
        .handleError({
          error: {
            mensaje:
              "Por favor diligencie todos los campos, la contraseña debe tener un minimo de 8 caracteres, el numero de celular o telefono debe ser de 10 digitos",
          },
          status: 400,
        })
        .then(() => this.publicService.hide());

    let { value } = this.registrationForm;

    this.authUserService.getCreateUser(value).subscribe({
      next: (res) =>
        Swal.fire({
          icon: "success",
          title: "Usuario Creado",
          text: res.message,
          showConfirmButton: true,
        }),
      error: (err) =>
        this.golbalError.handleError(err).then(() => this.publicService.hide()),
      complete: () => this.route.navigate(["/login"]),
    });
  }

  onReset() {
    this.registrationForm.reset();
  }
}
