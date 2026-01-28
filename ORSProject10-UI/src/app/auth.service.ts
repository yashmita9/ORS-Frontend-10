import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {

  constructor(
    private http: HttpServiceService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // 🔹 Login request → no token
    if (req.url.includes('/Auth/login')) {
      return next.handle(req);
    }

    // 🔹 Add token if available
    if (localStorage.getItem('fname') && localStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          withCredentials: 'true',
          name: 'Sanat',
          Authorization: this.http.getToken()
        }
      });
    }

    return next.handle(req).pipe(
      catchError(err => {

        /* 🔴 401 Unauthorized */
        if (err.status === 401) {

          const errorMsg = typeof err.error === 'string'
            ? err.error
            : '';

          // DB down / token internal issue → logout mat karo
          if (
            errorMsg.includes('Database') ||
            errorMsg.includes('Token')
          ) {
            return throwError(() => err);
          }

          // 🔁 Actual logout case
          localStorage.clear();
          this.router.navigateByUrl('/login/true');
          return EMPTY;
        }

        /* 🟠 503 Service Unavailable (DB down) */
        if (err.status === 503) {
          return throwError(() => err);
        }

        return throwError(() => err);
      })
    );
  }
}
