export interface AddressInterface {
  _id?: string;
  usuario: string;
  direccion: string;
  barrio: string;
  comuna?: string;
  codigoPostal?: string;
  informacionAdicional?: string;
}
