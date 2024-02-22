import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from '@services/Public/public.service';
import { AddressInterface } from '@interfaces/Address.interface';
import { ProductInterface } from '@interfaces/Product.interface';
import { AddressService } from '@services/Address/address.service';
import { GlobalErrorHandlerService } from '@services/global-error-handler/global-error-handler.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css'],
})
export class AddressListComponent implements OnInit {
  direcciones!: AddressInterface[];
  productos!: ProductInterface[];
  token!: string;

  constructor(
    private router: Router,
    public publicService: PublicService,
    public adressService: AddressService,
    private globalErrorHandlerService: GlobalErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('tokenCNG')!;

    if (!this.token)
      this.globalErrorHandlerService.handleError({ status: 401 });

    this.getAddressList();
  }

  getAddressList() {
    this.adressService.getAddresses(this.token).subscribe({
      next: (response) => {
        if (!response.length) {
          this.createAddress();

          Swal.fire({
            icon: 'warning',
            title: 'No tienes direcciones creadas',
            text: 'Por favor crea una dirección para continuar',
          });
        } else {
          this.direcciones = response;
          setTimeout(() => this.publicService.hide(), 1000);
        }
      },
      error: (error) => {
        this.globalErrorHandlerService.handleError(error);
      },
    });
  }

  onSelectDireccion(_id?: string) {
    this.adressService.direccionSeleccionada = this.direcciones.find(
      (direccion) => direccion._id === _id
    )!;
  }

  continueToOrder() {
    this.publicService.show();

    let route = this.router.url.split('/')[1];

    this.router.navigate([route, 'order']);
  }

  createAddress() {
    this.publicService.show();

    let route = this.router.url.split('/')[1];

    this.router.navigate([route, 'address', 'create']);
  }
}
