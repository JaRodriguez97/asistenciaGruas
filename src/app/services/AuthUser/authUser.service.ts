import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "@env/environment";

@Injectable({
  providedIn: "root",
})
export class AuthUserService {
  urlBack = environment.urlBack + "auth/";
  isAdmin!: boolean;

  headers(token?: string) {
    if (token)
      return new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: token,
      });

    return new HttpHeaders({ "Content-Type": "application/json" });
  }

  constructor(private http: HttpClient) {}

  getValidToken(token: string) {
    let headers = this.headers(token);

    return this.http.get(this.urlBack, { headers });
  }

  getCreateUser(form: any) {
    let headers = this.headers();

    return this.http.post<{ message: string }>(this.urlBack + "singup", form, {
      headers,
    });
  }

  getLoginUser(form: any) {
    let headers = this.headers();

    return this.http.post<{ rol: string; token: string }>(
      this.urlBack + "login",
      form,
      { headers }
    );
  }
}
