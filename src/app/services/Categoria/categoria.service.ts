import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { CategoryInterface } from "@interfaces/Category.interface";

@Injectable({
  providedIn: "root",
})
export class CategoriaService {
  urlBack = environment.urlBack + "category/";

  headers(token?: string) {
    if (token) {
      return new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: token,
      });
    }

    return new HttpHeaders({ "Content-Type": "application/json" });
  }

  constructor(private http: HttpClient) {}

  getCategoryList() {
    let headers = this.headers();

    return this.http.get<CategoryInterface[]>(this.urlBack, { headers });
  }

  createCategory(categoria: CategoryInterface, token: string) {
    let headers = this.headers(token);

    return this.http.post<CategoryInterface>(this.urlBack, categoria, {
      headers,
    });
  }

  deleteCategory(id: string, token: string) {
    let headers = this.headers(token);

    return this.http.delete<CategoryInterface>(this.urlBack + id, {
      headers,
    });
  }

  editCategory(categoriaEdit: CategoryInterface, id: string, token: string) {
    let headers = this.headers(token);

    return this.http.put<CategoryInterface>(this.urlBack + id, categoriaEdit, {
      headers,
    });
  }
}
