import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ContactService } from "@service/Contact/contact.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-contactanos",
  templateUrl: "./contactanos.component.html",
  styleUrls: ["./contactanos.component.css"],
})
export class ContactanosComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.contactForm = this.initForm();
  }

  async sendContactMail({ value }: FormGroup) {
    let { nombreCompleto, email, mensaje } = value;
    
    if (!nombreCompleto && !email && !mensaje) {
      Swal.fire({
        icon: "warning",
        html: "<span>Por favor diligencie los campos obligatorios para poder enviar el mensaje</span>",
        scrollbarPadding: false,
      });
    } else {
      this.contactService.sendMesage(value).subscribe(
        (res) => {
          console.log(res);
          Swal.fire({
            icon: "success",
            html: "<span>Su mensaje ha sido enviado satisfactoriamente, prontamente uno de nuestros operadores le contactará</span>",
            // scrollbarPadding: false,
          });
        },
        (err) => {
          console.error(err);

          Swal.fire({
            icon: "error",
            html: "<span>Ha ocurrido un error al enviar el correo</span>",
            // scrollbarPadding: false,
            confirmButtonText: "Intentar por WhatsApp",
            confirmButtonColor: "green",
            showDenyButton: true,
            denyButtonText: "Usar app email",
            denyButtonColor: "black",
          }).then((response) => {
            if (response.isConfirmed) {
              console.log(
                "🚀 ~ file: contactanos.component.ts:55 ~ ContactanosComponent ~ sendContactMail ~ response.isConfirmed",
                response.isConfirmed
              );
              this.router.navigateByUrl("https://wa.me/573185051107");
            }
            if (response.isDenied)
              this.router.navigate([
                `http://mailto:centralnacionaldegruasynineras@gmail.com`,
              ]);
          });
        }
      );
    }
  }

  initForm() {
    return this.formBuilder.group({
      nombreCompleto: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, Validators.minLength(5)]],
      mensaje: ["", [Validators.required, Validators.minLength(10)]],
    });
  }
}
