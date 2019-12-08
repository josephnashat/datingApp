import { environment } from './../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  decodedToken: any;
  baseUrl = environment.apiUrl + "auth/";
  helper = new JwtHelperService();

  login(model: any) {
    return this.http.post(this.baseUrl + "login", model).pipe(
      map(response => {
        const user: any = response;
        if (user) {
          localStorage.setItem("token", user.token);
          this.decodedToken = this.helper.decodeToken(user.token);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + "register", model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.helper.isTokenExpired(token);
  }
}
