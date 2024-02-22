import { Injectable } from '@angular/core';
import { AddressInterface } from '@interfaces/Address.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  backend = environment.urlBack;
  direccionSeleccionada!: AddressInterface;

  constructor(private http: HttpClient) {}

  getHeaders(Authorization: string) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization,
      }),
    };
  }

  getAddresses(token: string) {
    let options = this.getHeaders(token);

    return this.http.get<AddressInterface[]>(`${this.backend}address`, options);
  }

  createAddress(address: AddressInterface, token: string) {
    let options = this.getHeaders(token);

    return this.http.post(`${this.backend}address`, address, options);
  }
}
