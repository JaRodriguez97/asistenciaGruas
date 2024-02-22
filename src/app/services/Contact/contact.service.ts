import { environment } from "@env/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  URL = environment.urlBack + "contact/";

  constructor(private http: HttpClient) {}

  headers() {
    return new HttpHeaders({
      "Content-Type": "application/json",
    });
  }

  sendMesage(form: any) {
    let headers = this.headers();

    return this.http.post<{ messageId: string; message: string }>(
      this.URL,
      form,
      { headers }
    );
  }
}
