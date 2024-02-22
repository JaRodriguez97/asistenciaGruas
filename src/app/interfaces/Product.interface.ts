import { CategoryInterface } from "./Category.interface";

export interface ProductInterface {
  _id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  categoria: Array<string | CategoryInterface>;
  talla: string[];
  color?: string[];
  imagen: string[];
  disponible?: boolean;
  cantidadDisponible?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
