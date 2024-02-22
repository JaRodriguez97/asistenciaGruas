import { Injectable, ErrorHandler } from "@angular/core";
import { Router } from "@angular/router";
import { ValidationError } from "express-validator";
import Swal, { SweetAlertIcon } from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private router: Router) {}

  async handleError(error: {
    error?: { mensaje?: string; expiredAt?: any; errors?: ValidationError[] };
    status: number;
  }) {
    let title = "Ocurrió un error inesperado",
      text = "Por favor, inténtelo de nuevo más tarde.",
      icon: SweetAlertIcon = "error";

    if (error.status === 400) {
      title = "Acaba de ocurrir un error:";
      text = error.error!.mensaje!;
    } else if (error.status === 401 && error.error && error.error.expiredAt) {
      title = "Acceso no autorizado";
      text = "La sesión ha finalizado automaticamente.";
      icon = "info";
      this.router
        .navigate(["/login"])
        .then(() => localStorage.removeItem("tokenCNG"));
    } else if (error.status === 401) {
      title = "Acceso no autorizado";
      text = "Debes iniciar sesión para acceder a esta página.";
      icon = "info";
      this.router
        .navigate(["/login"])
        .then(() => localStorage.removeItem("tokenCNG"));
    } else if (error.status === 403) {
      title = "Acceso prohibido";
      text = "No tienes permiso para acceder a esta página.";
      icon = "warning";
    } else if (error.status === 422) {
      title = "Entidad no procesable";
      text =
        "Los datos proporcionados no son válidos o están incompletos: " +
        error.error!.errors!.map(({ msg }: ValidationError) => msg).join(", ");
    } else if (error.status === 500) {
      title = "Error interno del servidor";
      text =
        "Ocurrió un error en el servidor. Por favor, inténtelo de nuevo más tarde.";
    }

    Swal.fire({ icon, title, text });

    console.error("Error global:", error);
  }
}
