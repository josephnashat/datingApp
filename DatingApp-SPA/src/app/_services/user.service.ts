import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { User } from "../_models/user";
import { PaginatedResult } from "../_models/pagination";
import { map } from "rxjs/operators";

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

  getUsers(
    pageNumber?,
    pageSize?,
    userParams?
  ): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<
      User[]
    >();
    let params = new HttpParams();
    if (pageNumber != null && pageSize != null) {
      params = params.append("pageNumber", pageNumber);
      params = params.append("pageSize", pageSize);
    }
    if (userParams != null) {
      params = params.append("minAge", userParams.minAge);
      params = params.append("maxAge", userParams.maxAge);
      params = params.append("gender", userParams.gender);
      params = params.append("orderBy", userParams.orderBy);
    }
    return this.http
      .get<User[]>(this.baseUrl, {
        observe: "response",
        params
      })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get("Pagination") != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get("Pagination")
            );
          }
          return paginatedResult;
        })
      );
  }

  getUser(id: number): Observable<User> {
    // return this.http.get<User>(this.baseUrl + id, httpOptions);
    return this.http.get<User>(this.baseUrl + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + id, user);
  }

  setMainPhoto(userId: number, photoId: number) {
    return this.http.post(
      this.baseUrl + userId + "/photos/" + photoId + "/SetMain",
      {}
    );
  }

  deletePhoto(userId: number, photoId: number) {
    return this.http.delete(this.baseUrl + userId + "/photos/" + photoId);
  }
}
