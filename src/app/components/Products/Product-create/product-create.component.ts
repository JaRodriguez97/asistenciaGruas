import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CategoryInterface } from '@interfaces/Category.interface';
import { ProductInterface } from '@interfaces/Product.interface';
import { ProductoService } from '@services/Producto/producto.service';
import { GlobalErrorHandlerService } from '@services/global-error-handler/global-error-handler.service';
import { NgsRevealService } from 'ngx-scrollreveal';
import Swal from 'sweetalert2';
import { CategoriaService } from '@services/Categoria/categoria.service';
import { PublicService } from '@app/services/Public/public.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  categorias!: Array<CategoryInterface>;
  productoForm!: FormGroup;
  selectedProduct: ProductInterface | null = null;
  productos!: Array<ProductInterface>;
  tallasDisponibles = ['T.U.', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  selectedImage: Array<File> | null = null;
  labelImg: string = 'Seleccionar Imagen';
  displayedColumns: Array<string> = [
    'nombre',
    'precio',
    'categoria',
    'talla',
    'acciones',
  ];
  token!: string;

  dataSource!: MatTableDataSource<ProductInterface>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('file') file!: ElementRef<HTMLElement>;

  constructor(
    private fb: FormBuilder,
    private golbalError: GlobalErrorHandlerService,
    private productoService: ProductoService,
    public publicService: PublicService,
    private route: ActivatedRoute,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('tokenCNG')!;

    if (!this.token) this.golbalError.handleError({ status: 401 });

    this.getCategories();

    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      talla: ['', Validators.required],
      color: [''],
      imagen: [null, Validators.required],
      disponible: [true],
      cantidadDisponible: [null, Validators.min(0)],
    });
  }

  getCategories() {
    this.categoriaService.getCategoryList().subscribe({
      next: (v) => (this.categorias = v),
      error: (e) => this.golbalError.handleError(e),
      complete: () => this.getProductsList(),
    });
  }

  getProductsList() {
    this.productoService.getProductsList([]).subscribe({
      next: (v) => {
        this.productos = v;

        this.dataSource = new MatTableDataSource<ProductInterface>(
          this.productos
        );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (e) => this.golbalError.handleError(e),
      complete: () => setTimeout(() => this.publicService.hide(), 1000),
    });
  }

  limpiarFormulario() {
    Object.keys(this.productoForm.controls).forEach((key) => {
      const control = this.productoForm.get(key);
      control!.setValue(null);
      control!.markAsUntouched();
    });

    this.labelImg = 'Seleccionar Imagen';
    this.selectedImage = null;
    this.selectedProduct = null;
  }

  onFileSelected(e: any) {
    if (e.target.files && e.target.files.length) {
      this.selectedImage = e.target.files;

      this.labelImg = e.target.files[0].name;

      let reader = new FileReader();

      reader.readAsDataURL(this.selectedImage![0]);
      reader.onload = () => {
        const imageUrl = reader.result as string;

        Swal.fire({
          title: 'Imagen seleccionada',
          imageUrl,
          imageWidth: 300,
          showCancelButton: true,
          confirmButtonText: 'Sí, confirmar',
          cancelButtonText: 'No, cancelar',
        }).then(({ isConfirmed }) => {
          if (!isConfirmed) {
            this.selectedImage = null;
            this.productoForm.value.imagen = null;
            this.labelImg = 'Seleccionar Imagen';
          }
        });
      };
    } else console.log(e);
  }

  async onSubmit() {
    if (this.productoForm.valid && this.selectedImage) {
      const { value } = this.productoForm,
        formData = new FormData();

      for (const key in value) {
        const element = value[key];

        // !!! Pendiente cambios al guardar tallas !!!

        if (element) formData.append(key, element);
      }

      formData.append(
        'file',
        new Blob(this.selectedImage, { type: 'image/*' }),
        'products.' + this.selectedImage[0].name
      );

      this.productoService.createProduct(formData, this.token).subscribe({
        next: (r) =>
          Swal.fire({
            title: 'Producto ' + r.nombre + ' agregado',
            icon: 'success',
          }).then(() => this.limpiarFormulario()),
        error: (e) => this.golbalError.handleError(e),
        complete: () => this.getProductsList(),
      });
    } else if (!this.productoForm.value.imagen) {
      this.golbalError.handleError({
        error: { mensaje: 'Recuerde agregar la imagen' },
        status: 400,
      });
    } else console.error(this.productoForm);
  }

  deleteProduct(_id: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este producto?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.productoService.deleteProduct(_id, this.token).subscribe({
          next: (r) =>
            Swal.fire({
              title: 'Producto ' + r.nombre + ' eliminado',
              icon: 'success',
            }),
          error: (e) => this.golbalError.handleError(e),
          complete: () => this.getProductsList(),
        });
      }
    });
  }

  editProduct(id: string) {
    this.selectedProduct = this.productos.find(({ _id }) => _id == id)!;
    console.log(
      '🚀 ~ ProductCreateComponent ~ editProduct ~ this.selectedProduct:',
      this.selectedProduct
    );

    this.labelImg = !this.selectedProduct.imagen
      ? 'Sin Imagen'
      : this.selectedProduct.imagen[0].split('/').pop()!;

    this.productoForm.setValue({
      nombre: this.selectedProduct.nombre,
      descripcion: this.selectedProduct.descripcion || null,
      precio: this.selectedProduct.precio,
      categoria: (this.selectedProduct.categoria as CategoryInterface[]).map(
        ({ _id }) => _id
      ),
      talla: this.selectedProduct.talla,
      color: !this.selectedProduct.color
        ? 'Sin Colores'
        : this.selectedProduct.color, // Array de strings
      imagen: null,
      disponible: this.selectedProduct.disponible,
      cantidadDisponible: this.selectedProduct.cantidadDisponible,
    });
  }

  finishEditProduct(form: FormGroup, _id: string) {
    this.publicService.show();

    if (!form.value.imagen) form.value.imagen = this.selectedProduct!.imagen;

    const { value } = form,
      formData = new FormData();

    for (const key in value) {
      const element = value[key];

      if (element) formData.append(key, element);
    }

    if (this.selectedImage)
      formData.append(
        'file',
        new Blob(this.selectedImage, { type: 'image/*' }),
        'products.' + this.selectedImage[0].name
      );

    this.productoService.editProduct(formData, _id, this.token).subscribe({
      next: ({ nombre }) =>
        Swal.fire({
          title: 'Producto ' + nombre + ' actualizado',
          icon: 'success',
        }).then(() => this.limpiarFormulario()),
      error: (e) => this.golbalError.handleError(e),
      complete: () => this.getProductsList(),
    });
  }
}
