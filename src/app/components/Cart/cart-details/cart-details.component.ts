import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from '@services/Public/public.service';
import { CartInterface, CartItem } from '@interfaces/Cart.interface';
import { CartService } from '@services/Cart/cart.service';
import { GlobalErrorHandlerService } from '@services/global-error-handler/global-error-handler.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  cart!: CartInterface;
  productos!: CartItem[];
  token!: string;

  constructor(
    private cartService: CartService,
    public publicService: PublicService,
    private router: Router,
    private globalErrorHandlerService: GlobalErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('tokenCNG')!;

    if (!this.token)
      this.globalErrorHandlerService.handleError({
        status: 401,
      });

    this.getCart();
  }

  getCart(): void {
    this.cartService.getCart(this.token).subscribe({
      next: (res) => {
        this.cart = res;
        this.productos = res && res.productos ? res.productos : [];
      },
      error: (err) => this.globalErrorHandlerService.handleError(err),
      complete: () => setTimeout(() => this.publicService.hide(), 1000),
    });
  }

  restProduct(_id: string): void {
    this.publicService.show();

    this.cartService.removeFromCart(_id, this.token).subscribe({
      next: (_) => this.getCart(),
      error: (err) => this.globalErrorHandlerService.handleError(err),
    });
  }

  getToAddress(): any {
    this.publicService.show();

    let sinTalla = this.productos.find(
      (p) => !p.tallasSeleccionadas || p.tallasSeleccionadas.length == 0
    );

    if (sinTalla)
      return Swal.fire({
        title: 'Error',
        text: 'Debes seleccionar talla para ' + sinTalla.producto.nombre,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      }).then(() => this.publicService.hide());

    this.cart.productos = this.productos;

    this.cartService.updateCart(this.cart, this.token).subscribe({
      next: (_) => {
        let route = this.router.url.split('/')[1];

        this.router.navigate(['/', route, 'address']);
      },
      error: (err) => this.globalErrorHandlerService.handleError(err),
    });
  }

  validarCantidad(p: CartItem, talla: string) {
    if (p.tallasSeleccionadas?.includes(talla)) return false;
    else if (p.cantidad == p.tallasSeleccionadas?.length) return true;

    return false;
  }
}
