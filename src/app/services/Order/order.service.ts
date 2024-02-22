import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderInterface } from '@interfaces/order.interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  urlBack = environment.urlBack + 'order/';

  constructor(private http: HttpClient) {}

  getHeaders(Authorization: string) {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization,
    });
  }

  getCreateOrder(token: string, order: OrderInterface) {
    let headers = this.getHeaders(token);

    return this.http.post<OrderInterface>(this.urlBack + 'create', order, {
      headers,
    });
  }

  getOrder(id: string, token: string) {
    let headers = this.getHeaders(token);

    return this.http.get<OrderInterface>(this.urlBack + id, {
      headers,
    });
  }

  getOrderList(token: string) {
    let headers = this.getHeaders(token);

    return this.http.get<Array<OrderInterface>>(this.urlBack, {
      headers,
    });
  }

  getUserOrders(token: string) {
    let headers = this.getHeaders(token);

    return this.http.get<Array<OrderInterface>>(this.urlBack + 'userOrders', {
      headers,
    });
  }

  deleteOrder(_id: string, token: string) {
    let headers = this.getHeaders(token);

    return this.http.delete<OrderInterface>(this.urlBack + _id, {
      headers,
    });
  }

  updateOrder(_id: string, token: string, estado: string) {
    let headers = this.getHeaders(token);

    return this.http.put<OrderInterface>(
      this.urlBack + _id,
      { estado },
      { headers }
    );
  }
}
