import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { User } from "../_models/user";

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: "Bearer " + localStorage.getItem("token")
//   })
// };

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}
  baseUrl = environment.apiUrl + "users/";

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUser(id: number): Observable<User> {
    // return this.http.get<User>(this.baseUrl + id, httpOptions);
    return this.http.get<User>(this.baseUrl + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + id, user);
  }
}
