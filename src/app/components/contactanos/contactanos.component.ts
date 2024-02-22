import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PublicService } from "@app/services/Public/public.service";
import { ContactService } from "@services/Contact/contact.service";
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
    private publicService: PublicService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      nombreCompleto: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, Validators.minLength(5)]],
      mensaje: ["", [Validators.required, Validators.minLength(10)]],
    });
  }

  async sendContactMail({ value }: FormGroup): Promise<any> {
    this.publicService.show();

    let { nombreCompleto, email, mensaje } = value;

    if (!nombreCompleto || !email || !mensaje)
      return Swal.fire({
        icon: "warning",
        html: "<span>Por favor diligencie los campos obligatorios para poder enviar el mensaje</span>",
        scrollbarPadding: false,
      }).then(() => this.publicService.hide());

    this.contactService.sendMesage(value).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: res.message,
          html: "<span>Prontamente uno de nuestros operadores le contactará</span>",
          // scrollbarPadding: false,
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Ha ocurrido un error al enviar el correo",
          html: `
          <style>
            .a {
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 10px auto;
              font-size: 1.5em;
            }

            .wh {
              color: green;
            }
            .gm {
              color: red;
            }
          </style>
          <a href="https://wa.me/573243973949" class="a wh" target="_blank">
            Intentar por WhatsApp <small>(324 397 3949)</small>
          </a>
          <a
            href="mailto:gngencali@gmail.com"
            class="a gm"
            target="_blank"
          >
            Usar app email
          </a>
          `,
        }).then(() => this.publicService.hide());
      },
      complete: () => this.publicService.hide(),
    });
  }
}
