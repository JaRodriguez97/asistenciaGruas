import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { ProductInterface } from "@interfaces/Product.interface";

@Injectable({
  providedIn: "root",
})
export class ProductoService {
  urlBack = environment.urlBack + "product/";

  headers(token?: string) {
    if (token) {
      return new HttpHeaders({
        Authorization: token,
      });
    }

    return new HttpHeaders({ "Content-Type": "application/json" });
  }

  constructor(private http: HttpClient) {}

  getProductsList(objCheck: Array<string>) {
    let headers = this.headers();

    return this.http.post<ProductInterface[]>(
      this.urlBack,
      { objCheck },
      { headers }
    );
  }

  createProduct(producto: FormData, token: string) {
    let headers = this.headers(token);

    return this.http.post<ProductInterface>(this.urlBack + "create", producto, {
      headers,
    });
  }

  deleteProduct(id: string, token: string) {
    let headers = this.headers(token);

    return this.http.delete<ProductInterface>(this.urlBack + id, {
      headers,
    });
  }

  editProduct(producto: FormData, _id: string, token: string) {
    let headers = this.headers(token);

    return this.http.put<ProductInterface>(this.urlBack + _id, producto, {
      headers,
    });
  }

  getProduct(id: string) {
    let headers = this.headers();

    return this.http.get<ProductInterface>(this.urlBack + id, {
      headers,
    });
  }
}
