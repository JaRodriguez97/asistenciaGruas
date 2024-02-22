import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { CartInterface, CartItem } from "@interfaces/Cart.interface";

@Injectable({
  providedIn: "root",
})
export class CartService {
  urlBack = environment.urlBack + "cart/";
  cart!: CartInterface;

  headers(token: string) {
    return new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: token,
    });
  }

  constructor(private http: HttpClient) {}

  getCart(token: string) {
    let headers = this.headers(token);

    return this.http.get<CartInterface>(this.urlBack, { headers });
  }

  addToCart(_id: string, token: string) {
    let headers = this.headers(token);

    return this.http.get<string>(this.urlBack + _id, { headers });
  }

  removeFromCart(_id: string, token: string) {
    let headers = this.headers(token);

    return this.http.delete(this.urlBack + _id, { headers });
  }

  updateCart(cart: CartInterface, token: string) {
    let headers = this.headers(token);

    return this.http.put(this.urlBack, cart, { headers });
  }
}
