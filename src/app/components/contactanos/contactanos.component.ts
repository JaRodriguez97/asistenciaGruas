import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-contactanos",
  templateUrl: "./contactanos.component.html",
  styleUrls: ["./contactanos.component.css"],
})
export class ContactanosComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit() {}

  sendContactMail() {
    if (this.contactForm.invalid) {
      Swal.fire({
        icon: "warning",
        html: "<span>Por favor diligencie los campos obligatorios para poder enviar el mensaje</span>",
      });
    }
  }
}
