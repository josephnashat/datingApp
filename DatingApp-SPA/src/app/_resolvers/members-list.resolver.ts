import { catchError } from 'rxjs/operators';
import { AlertifyService } from "../_services/alertify.service";
import { UserService } from "../_services/user.service";
import { User } from "../_models/user";
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class MembersListResolver implements Resolve<User[]> {
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]>  {
    return this.userService.getUsers()
      .pipe(
        catchError(err => {
          this.alertify.error(err);
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}
