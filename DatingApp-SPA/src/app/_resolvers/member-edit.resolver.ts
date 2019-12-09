import { AuthService } from './../_services/auth.service';
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
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private auth: AuthService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> | Promise<User> {
    return this.userService.getUser(this.auth.decodedToken.nameid)
      .pipe(
        catchError(err => {
          this.alertify.error( err);
          this.router.navigate(['/members']);
          return of(null);
        })
      );
  }
}
