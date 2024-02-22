import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddressService } from '@services/Address/address.service';
import { GlobalErrorHandlerService } from '@services/global-error-handler/global-error-handler.service';
import { PublicService } from '@services/Public/public.service';

@Component({
  selector: 'app-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.css'],
})
export class AddressCreateComponent implements OnInit {
  addressForm!: FormGroup;
  token!: string;

  constructor(
    private fb: FormBuilder,
    public publicService: PublicService,
    private globalErrorHandlerService: GlobalErrorHandlerService,
    private router: Router,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('tokenCNG')!;

    if (!this.token)
      this.globalErrorHandlerService.handleError({
        status: 401,
      });

    this.addressForm = this.fb.group({
      direccion: ['', Validators.required],
      barrio: ['', Validators.required],
      comuna: [null],
      codigoPostal: [null],
      informacionAdicional: [''],
    });

    setTimeout(() => this.publicService.hide(), 1000);
  }

  onSubmitForm({ value }: any) {
    this.addressService.createAddress(value, this.token).subscribe({
      next: (_) => {
        let { url } = this.router;

        let segmentos = url.split('/');

        this.router.navigate([segmentos[1], 'address']);
      },
      error: (err) => this.globalErrorHandlerService.handleError(err),
      complete: () =>
        Swal.fire({
          icon: 'success',
          title: 'Dirección creada con éxito',
          showConfirmButton: false,
          timer: 3000,
        }),
    });
  }
}
