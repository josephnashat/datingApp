import { User } from './../_models/user';
import { environment } from './../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  decodedToken: any;
  currentUser: User;
  baseUrl = environment.apiUrl + "auth/";
  helper = new JwtHelperService();
  private photoUrl = new BehaviorSubject<string>("../../assets/user.png");
  currentPhotoUrl = this.photoUrl.asObservable();

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + "login", model).pipe(
      map(response => {
        const user: any = response;
        if (user) {
          localStorage.setItem("token", user.token);
          localStorage.setItem("user", JSON.stringify(user.user));
          this.decodedToken = this.helper.decodeToken(user.token);
          this.currentUser = user.user;
          this.changeMemberPhoto( this.currentUser.photoUrl);
        }
      })
    );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + "register", user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.helper.isTokenExpired(token);
  }
}
