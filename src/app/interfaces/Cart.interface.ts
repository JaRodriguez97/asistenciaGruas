import { ProductInterface } from './Product.interface';

export interface CartItem {
  producto: ProductInterface;
  cantidad: number;
  tallasSeleccionadas?: string[];
}

export interface CartInterface {
  _id?: string;
  usuario: string; // asignar id del carrito al usuario para poder asignar id del carrito al pedido
  productos: CartItem[];
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
}
