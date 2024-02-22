import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PublicService } from '@services/Public/public.service';
import { CategoryInterface } from '@interfaces/Category.interface';
import { CategoriaService } from '@services/Categoria/categoria.service';
import { GlobalErrorHandlerService } from '@services/global-error-handler/global-error-handler.service';
import { NgsRevealService } from 'ngx-scrollreveal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias-create',
  templateUrl: './categorias-create.component.html',
  styleUrls: ['./categorias-create.component.css'],
})
export class CategoriasCreateComponent implements OnInit, OnChanges {
  categorias!: Array<CategoryInterface>;
  categoriaForm!: FormGroup;
  selectedCategory: CategoryInterface | null = null;
  displayedColumns: string[] = [
    //'position',
    'nombre',
    'descripcion',
    'acciones',
  ];

  token!: string;

  dataSource!: MatTableDataSource<CategoryInterface>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private golbalError: GlobalErrorHandlerService,
    public publicService: PublicService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('tokenCNG')!;

    if (!this.token) this.golbalError.handleError({ status: 401 });

    this.getCategoryList();

    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
    });
  }

  getCategoryList() {
    this.categoriaService.getCategoryList().subscribe({
      next: (v) => {
        this.categorias = v;

        this.dataSource = new MatTableDataSource<CategoryInterface>(
          this.categorias
        );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (e) => this.golbalError.handleError(e),
      complete: () => setTimeout(() => this.publicService.hide(), 1000),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categorias']) {
      this.dataSource = new MatTableDataSource<CategoryInterface>(
        this.categorias
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  async limpiarFormulario() {
    Object.keys(this.categoriaForm.controls).forEach((key) => {
      const control = this.categoriaForm.get(key);
      control!.setValue(null);
      control!.markAsUntouched();
    });
    this.selectedCategory = null;
  }

  async onSubmit() {
    this.publicService.show();

    if (this.categoriaForm.valid) {
      const { value } = this.categoriaForm;

      this.categoriaService.createCategory(value, this.token).subscribe({
        next: (r) =>
          Swal.fire({
            title: 'Categoria ' + r.nombre + ' agregada',
            icon: 'success',
          }).then(() => this.limpiarFormulario()),
        error: (e) => this.golbalError.handleError(e),
        complete: () => this.getCategoryList(),
      });
    } else {
      console.error(this.categoriaForm);
      this.publicService.hide();
    }
  }

  deleteCategory(_id: string) {
    this.publicService.show();

    Swal.fire({
      title: '¿Estás seguro de eliminar esta categoría?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.categoriaService.deleteCategory(_id, this.token).subscribe({
          next: (r) =>
            Swal.fire({
              title: 'Categoria ' + r.nombre + ' eliminada',
              icon: 'success',
            }),
          error: (e) => this.golbalError.handleError(e),
          complete: () => this.getCategoryList(),
        });
      } else this.publicService.hide();
    });
  }

  editCategory(id: string) {
    this.publicService.show();
    this.selectedCategory = this.categorias.find(({ _id }) => _id == id)!;

    this.categoriaForm.setValue({
      nombre: this.selectedCategory.nombre,
      descripcion: this.selectedCategory.descripcion,
    });

    setTimeout(() => this.publicService.hide(), 500);
  }

  finishEditCategory(form: FormGroup, _id: string) {
    this.publicService.show();
    this.categoriaService.editCategory(form.value, _id, this.token).subscribe({
      next: ({ nombre }) =>
        Swal.fire({
          title: 'Categoria ' + nombre + ' actualizada',
          icon: 'success',
        }).then(() => this.limpiarFormulario()),
      error: (e) => this.golbalError.handleError(e),
      complete: () => this.getCategoryList(),
    });
  }
}
