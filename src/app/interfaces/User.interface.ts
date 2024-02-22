export interface UserInterface {
  _id?: string;
  nombres: string;
  numeroTelefono: number;
  email: string;
  contraseña: string;
  rol: string;
  img: string;
  favoritos?: Array<string>;
}
