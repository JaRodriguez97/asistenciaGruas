import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { ContactService } from "@service/Contact/contact.service";
@Component({
  selector: "app-contactanos",
  templateUrl: "./contactanos.component.html",
  styleUrls: ["./contactanos.component.css"],
})
export class ContactanosComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(
    private contactService: ContactService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.contactForm = this.initForm();
  }

  async sendContactMail(contactForm: FormGroup) {
    if (contactForm.invalid) {
      Swal.fire({
        icon: "warning",
        html: "<span>Por favor diligencie los campos obligatorios para poder enviar el mensaje</span>",
        scrollbarPadding: false,
      });
    } else {
      console.log(contactForm.value, "sqonjxazlstinhes");

      this.contactService.sendMesage(contactForm.value).subscribe(
        (res) => console.log(res),
        (err) => console.error(err)
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
