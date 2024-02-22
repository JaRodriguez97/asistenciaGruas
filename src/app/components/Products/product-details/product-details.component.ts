import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartInterface } from '@app/interfaces/Cart.interface';
import { CartService } from '@app/services/Cart/cart.service';
import { PublicService } from '@app/services/Public/public.service';
import { ProductInterface } from '@interfaces/Product.interface';
import { ProductoService } from '@services/Producto/producto.service';
import { GlobalErrorHandlerService } from '@services/global-error-handler/global-error-handler.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  producto!: ProductInterface;
  categorias!: string;
  carritoCompras!: CartInterface;
  token!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    public publicService: PublicService,
    private router: Router,
    private cartService: CartService,
    private globalError: GlobalErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('tokenCNG')!;

    let { id } = this.activatedRoute.snapshot.params;

    this.getProduct(id);
  }

  getProduct(id: string) {
    this.productoService.getProduct(id).subscribe({
      next: (res) => {
        this.producto = res;
        this.categorias = this.producto.categoria
          .map((c) => (typeof c !== 'string' ? c.nombre : c))
          .join(', ');
      },
      error: (err) => this.globalError.handleError(err),
      complete: () =>
        this.token
          ? this.getCart()
          : setTimeout(() => this.publicService.hide(), 1000),
    });
  }

  getCart() {
    this.publicService.show();

    this.cartService.getCart(this.token).subscribe({
      next: (res) => (this.carritoCompras = res),
      error: (err) => this.globalError.handleError(err),
      complete: () => setTimeout(() => this.publicService.hide(), 1000),
    });
  }

  existsProductCart(id: string): Boolean {
    if (this.carritoCompras)
      return this.carritoCompras.productos.some(
        ({ producto }) => producto._id == id
      );

    return false;
  }

  addToCar(product_id: string): any {
    this.publicService.show();

    if (!this.token) {
      return Swal.fire({
        icon: 'warning',
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión antes de realizar esta acción.',
        showCancelButton: true,
        confirmButtonText: 'Iniciar sesión',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) this.router.navigate(['login']);
        else setTimeout(() => this.publicService.hide(), 1000);
      });
    }

    this.cartService.addToCart(product_id, this.token).subscribe({
      next: (_) =>
        // localStorage.setItem('cartIdCNG', res);
        this.getCart(),
      error: (err) =>
        this.globalError.handleError(err).then(() => this.publicService.hide()),
    });
  }

  cantidadProductCart(id: string): Number {
    if (this.carritoCompras) {
      let p = this.carritoCompras.productos.find(
        ({ producto }) => producto._id == id
      );

      return p?.cantidad!;
    }

    return 0;
  }

  removeFromCart(product_id: string): any {
    this.publicService.show();

    if (!this.token)
      return Swal.fire({
        icon: 'warning',
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión antes de realizar esta acción.',
        showCancelButton: true,
        confirmButtonText: 'Iniciar sesión',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) this.router.navigate(['login']);
        else this.publicService.hide();
      });

    this.cartService.removeFromCart(product_id, this.token).subscribe({
      next: (_) => this.getCart(),
      error: (err) =>
        this.globalError.handleError(err).then(() => this.publicService.hide()),
      complete: () => setTimeout(() => this.publicService.hide(), 1000),
    });
  }
}
