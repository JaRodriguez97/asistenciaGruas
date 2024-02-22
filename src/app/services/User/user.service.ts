import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface } from '@interfaces/User.interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  urlBack = environment.urlBack + 'user/';

  constructor(private http: HttpClient) {}

  getHeaders(Authorization: string) {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization,
    });
  }

  getUser(token: string) {
    let headers = this.getHeaders(token);

    return this.http.get<UserInterface>(this.urlBack + 'me', {
      headers,
    });
  }
}
