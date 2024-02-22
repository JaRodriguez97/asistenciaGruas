import { AddressInterface } from './Address.interface';
import { CartItem } from './Cart.interface';
import { UserInterface } from './User.interface';

export interface OrderInterface {
  _id?: string;
  usuario?: string | UserInterface;
  nombres: string;
  telefono: number;
  productos: CartItem[];
  direccionEnvio: AddressInterface | string;
  estado?: string;
  colaborador?: string | UserInterface;
  REF?: string;
  fechaOrden?: Date;
  fechaProcesado?: Date | null;
  fechaEnvio?: Date | null;
  fechaEntrega?: Date | null;
  total?: number;
  totalProductos?: number;

  createdAt?: Date;
  updatedAt?: Date;
}
