import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicService } from '@app/services/Public/public.service';
import { CartInterface } from '@interfaces/Cart.interface';
import { OrderInterface } from '@interfaces/order.interface';
import { AddressService } from '@services/Address/address.service';
import { CartService } from '@services/Cart/cart.service';
import { OrderService } from '@services/Order/order.service';
import { UserService } from '@services/User/user.service';
import { GlobalErrorHandlerService } from '@services/global-error-handler/global-error-handler.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css'],
})
export class OrderCreateComponent implements OnInit {
  orderForm!: FormGroup;
  token!: string;
  order!: OrderInterface;
  cart!: CartInterface;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adressService: AddressService,
    private orderService: OrderService,
    public publicService: PublicService,
    private userService: UserService,
    private cartService: CartService,
    private globalErrorHandlerService: GlobalErrorHandlerService
  ) {}

  ngOnInit(): any {
    this.token = localStorage.getItem('tokenCNG')!;

    if (!this.token)
      return this.globalErrorHandlerService.handleError({ status: 401 });

    this.orderForm = this.fb.group({
      nombres: ['', Validators.required],
      telefono: [null, Validators.required],
      direccionEnvio: [this.adressService.direccionSeleccionada],
    });

    if (!this.adressService.direccionSeleccionada) {
      let { url } = this.router;

      let segmentos = url.split('/');

      return this.router.navigate([segmentos[1], 'address']);
    }

    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.token).subscribe({
      next: (res) => {
        this.orderForm.controls['nombres'].setValue(res.nombres);
        this.orderForm.controls['telefono'].setValue(res.numeroTelefono);
      },
      error: (err) => this.globalErrorHandlerService.handleError(err),
      complete: () => this.getCart(),
    });
  }

  getCart() {
    this.cartService.getCart(this.token).subscribe({
      next: (res) => (this.cart = res),
      error: (err) => this.globalErrorHandlerService.handleError(err),
      complete: () => setTimeout(() => this.publicService.hide()),
    });
  }

  sendOrder() {
    let { value } = this.orderForm,
      { nombres, telefono, direccionEnvio } = value,
      html = `
    <style>
      main {
        display: grid;
        gap: 1rem;
        margin: 1rem;
      }

      article {
        border: 1px solid #000;
        padding: 1rem;
        border-radius: 20px;
      }

      .mat-typography h2,
      article h2,
      article ul,
      article dl,
      article dl dt,
      article dl dd,
      article dl h1 {
        margin: 0;
        padding: 0;
      }

      article ul li {
        list-style: none;
      }

      article.productos ul {
        align-items: baseline;
        display: flex;
        flex-direction: column;
      }

      article.productos ul li {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
    <main style="text-wrap: balance;">
      <article>
        <h2>Información del Cliente</h2>
        <ul>
          <li>Nombres: <strong> ${nombres}</strong></li>
          <li>Teléfono: <strong> ${telefono}</strong></li>
        </ul>
      </article>

      <article>
        <h2>Lugar y Datos de Entrega</h2>
        <ul>
          <li>Dirección de Envío: <address>${
            typeof direccionEnvio == 'string'
              ? direccionEnvio
              : direccionEnvio.direccion
          }</address></li>
          <li>Barrio: <strong>${
            typeof direccionEnvio == 'string'
              ? direccionEnvio
              : direccionEnvio.barrio
          }</strong></li>
          <li>Comuna: <strong>${
            typeof direccionEnvio == 'string'
              ? direccionEnvio
              : direccionEnvio.comuna
          }</strong></li>
          <li>Código Postal: <strong>${
            typeof direccionEnvio == 'string'
              ? direccionEnvio
              : direccionEnvio.codigoPostal
          }</strong></li>
          <li>Información Adicional: <strong>${
            typeof direccionEnvio == 'string'
              ? direccionEnvio
              : direccionEnvio.informacionAdicional
          }</strong></li>
        </ul>
      </article>

      <article class="productos">
        <h2>Resumen de Productos</h2>
        <ul>
        ${this.cart.productos
          .map((p) => {
            let { producto, cantidad } = p;

            return `<li> <img src="${producto.imagen[0]}" width="50px" alt="${producto.nombre}"> ${producto.nombre} - ${cantidad} Unidad(es)</li>`;
          })
          .join('')}
        </ul>
        <dl>
          <dt>Total:</dt>
          <dd> <h1>$ ${this.cart.total || 0}</h1></dd>
        </dl>
      </article>
    </main>
    `;

    Swal.fire({
      title: 'Confirmar Pedido',
      html,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then(({ isConfirmed }) => (isConfirmed ? this.confirmarOrden() : null));

    this.order = {
      nombres,
      telefono,
      direccionEnvio,
      productos: this.cart.productos,
      total: this.cart.total,
    };
  }

  confirmarOrden() {
    this.publicService.show();

    this.orderService.getCreateOrder(this.token, this.order).subscribe({
      next: (res) => this.router.navigate(['/dashboard', 'order', res._id]),
      error: (err) => this.globalErrorHandlerService.handleError(err),
    });
  }
}
