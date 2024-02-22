import { ViewportScroller } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from '@app/services/Public/public.service';
import { CartInterface } from '@interfaces/Cart.interface';
import { CategoryInterface } from '@interfaces/Category.interface';
import { ProductInterface } from '@interfaces/Product.interface';
import { CartService } from '@services/Cart/cart.service';
import { CategoriaService } from '@services/Categoria/categoria.service';
import { ProductoService } from '@services/Producto/producto.service';
import { GlobalErrorHandlerService } from '@services/global-error-handler/global-error-handler.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productos: Array<ProductInterface> = [];
  categorias: Array<CategoryInterface> = [];
  carritoCompras!: CartInterface;
  landingRoute: boolean = false;
  token!: string;
  hidden = false;
  show = false;

  arrayRandoms!: number[];
  positions: { top: number; left: number }[] = [];

  @ViewChild('contenido') contenido!: ElementRef;

  categoriasForm: { [key: string]: Boolean } = {};

  constructor(
    private productoService: ProductoService,
    public publicService: PublicService,
    private categoriaService: CategoriaService,
    private cartService: CartService,
    private globalErrorHandlerService: GlobalErrorHandlerService,
    private viewportScroller: ViewportScroller,
    private router: Router
  ) {
    for (let i = 0; i < 20; i++) {
      // Genera valores aleatorios para las propiedades top y left y los agrega a la matriz de posiciones
      const top = Math.floor(Math.random() * (window.innerHeight * 3));
      const left = Math.floor(Math.random() * window.innerWidth);
      this.positions.push({ top, left });
    }
  }

  ngOnInit() {
    let { url } = this.router;
    // console.log('🚀 ~ ProductListComponent ~ ngOnInit ~ url:', url);

    this.landingRoute = url.indexOf('landing') !== -1;
    this.getCategoriasList();

    this.token = localStorage.getItem('tokenCNG')!;

    if (this.token) {
      this.getCart();
      let segmentos = url.split('/');
      if (segmentos.length > 2) this.toggleBadgeVisibility();
    }
  }

  getCategoriasList() {
    this.categoriaService.getCategoryList().subscribe({
      next: (res) => {
        this.categorias = res.sort((a, b) => a.nombre.localeCompare(b.nombre));

        this.categorias.forEach((c) => (this.categoriasForm[c._id] = false));
      },
      error: (err) => this.globalErrorHandlerService.handleError(err),
      complete: () => this.getProductsList(),
    });
  }

  getProductsList() {
    let objSend = Object.keys(this.categoriasForm).filter(
      (c) => this.categoriasForm[c]
    );

    this.productoService.getProductsList(objSend).subscribe({
      next: (v) => {
        if (this.landingRoute)
          this.productos = v
            .splice(0, 6)
            .sort((a, b) => a.nombre.localeCompare(b.nombre));
        else
          this.productos = v.sort((a, b) => a.nombre.localeCompare(b.nombre));
      },
      error: (e) => this.globalErrorHandlerService.handleError(e),
      complete: () => setTimeout(() => this.publicService.hide(), 1000),
    });
  }

  onCheckboxChange(event: any, categoria: string) {
    this.publicService.show();

    this.categoriasForm[categoria] = !this.categoriasForm[categoria];

    this.getProductsList();
  }

  getCart() {
    this.publicService.show();

    this.cartService.getCart(this.token).subscribe({
      next: (res) => (this.carritoCompras = res),
      error: (err) => this.globalErrorHandlerService.handleError(err),
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

  cantidadProductCart(id: string): Number {
    if (this.carritoCompras) {
      let p = this.carritoCompras.productos.find(
        ({ producto }) => producto._id == id
      );

      return p?.cantidad!;
    }

    return 0;
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
      next: (res) => {
        // localStorage.setItem('cartIdCNG', res);

        this.getCart();
      },
      error: (err) =>
        this.globalErrorHandlerService
          .handleError(err)
          .then(() => this.publicService.hide()),
    });
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
        this.globalErrorHandlerService
          .handleError(err)
          .then(() => this.publicService.hide()),
      complete: () => setTimeout(() => this.publicService.hide(), 1000),
    });
  }

  toggleBadgeVisibility() {
    this.publicService.show();

    if (!this.token)
      Swal.fire({
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
    else {
      let { url } = this.router;
      let segmentos = url.split('/');
      let route = segmentos[1];
      this.hidden = !this.hidden;

      if (this.hidden) {
        if (segmentos.length > 2) this.router.navigate([url]);
        else {
          if (route.includes('#'))
            this.router.navigate([route.split('#')[0], 'cart']);
          else this.router.navigate([route, 'cart']);
        }
      } else {
        this.router.navigate([route]);
        setTimeout(() => this.publicService.hide(), 1000);
      }
    }
  }

  scrolltop() {
    this.contenido.nativeElement.scrollIntoView();
  }

  closedSesion() {
    Swal.fire({
      title: '¿Deseas cerrar sesión?',
      text: 'Serás redirigido al Login.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then(({ isConfirmed }) =>
      isConfirmed
        ? this.router
            .navigate(['/login'])
            .then(() => localStorage.removeItem('tokenCNG'))
        : null
    );
  }
}
