import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryInterface } from '@interfaces/Category.interface';
import { ProductInterface } from '@interfaces/Product.interface';
import { OrderInterface } from '@interfaces/order.interface';
import { GlobalErrorHandlerService } from '@services/global-error-handler/global-error-handler.service';
import { OrderService } from '@services/Order/order.service';
import Swal from 'sweetalert2';
import { PublicService } from '@app/services/Public/public.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  // ** Orders **
  // selectedOrder: OrderInterface | null = null;
  orders!: Array<OrderInterface>;

  // !! Products !!
  // selectedProduct: ProductInterface | null = null;
  // productos!: Array<ProductInterface>;

  // ** Categories **
  // categorias!: Array<CategoryInterface>;
  displayedColumns: Array<string> = [
    'estado',
    'fechaOrden',
    'totalProductos',
    'total',
    'acciones',
  ];
  token!: string;

  dataSource!: MatTableDataSource<OrderInterface>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private golbalError: GlobalErrorHandlerService,
    private orderService: OrderService,
    public publicService: PublicService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('tokenCNG')!;

    if (!this.token) this.golbalError.handleError({ status: 401 });

    this.getOrdersList();
  }

  getOrdersList() {
    this.orderService.getOrderList(this.token).subscribe({
      next: (v) => {
        this.orders = v;

        this.dataSource = new MatTableDataSource<OrderInterface>(this.orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (e) => this.golbalError.handleError(e),
      complete: () => setTimeout(() => this.publicService.hide(), 1000),
    });
  }

  statusOrderClass(estado: string) {
    let obj: { [key: string]: boolean } = {};

    obj[estado] = true;

    return obj;
  }

  // deleteOrder(_id: string) {
  //   Swal.fire({
  //     title: '¿Estás seguro de eliminar este producto?',
  //     text: 'Esta acción no se puede deshacer',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#d33',
  //     cancelButtonColor: '#3085d6',
  //     confirmButtonText: 'Sí, eliminar',
  //     cancelButtonText: 'Cancelar',
  //   }).then(({ isConfirmed }) => {
  //     if (isConfirmed) {
  //       this.orderService.deleteOrder(_id, this.token).subscribe({
  //         next: (r) =>
  //           Swal.fire({
  //             title: 'Pedido ' + r._id + ' eliminado',
  //             icon: 'success',
  //           }),
  //         error: (e) => this.golbalError.handleError(e),
  //         complete: () => this.getOrdersList(),
  //       });
  //     }
  //   });
  // }

  // editOrder(id: string) {
  //   // this.selectedOrder = this.orders.find(({ _id }) => _id == id)!;

  //   // this.productoForm.setValue({
  //   //   nombre: this.selectedProduct.nombre,
  //   //   descripcion: this.selectedProduct.descripcion || null,
  //   //   precio: this.selectedProduct.precio,
  //   //   categoria: (this.selectedProduct.categoria as CategoryInterface[]).map(
  //   //     ({ _id }) => _id
  //   //   ),
  //   //   talla: this.selectedProduct.talla,
  //   //   color: !this.selectedProduct.color
  //   //     ? 'Sin Colores'
  //   //     : this.selectedProduct.color, // Array de strings
  //   //   imagen: null,
  //   //   disponible: this.selectedProduct.disponible,
  //   //   cantidadDisponible: this.selectedProduct.cantidadDisponible,
  //   // });
  // }
}
