import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 401) {
          return throwError(error.statusText);
        }
        if (error instanceof HttpErrorResponse) {
          const applicationError = error.headers.get("Application-Error");
          if (applicationError) {
            return throwError(applicationError);
          }
          const serverErrors = error.error;
          let modelStateErrors = "";
          if (serverErrors.errors && typeof serverErrors.errors === "object") {
            for (const key in serverErrors.errors) {
              if (serverErrors.errors[key]) {
                modelStateErrors += serverErrors.errors[key] + "\n";
              }
            }
          }
          return throwError(modelStateErrors || serverErrors || "Server Error");
        }
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: ErrorInterceptor
};
