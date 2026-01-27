import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { HttpServiceService } from './http-service.service';
// import { throwError } from 'rxjs';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {

  constructor(private http: HttpServiceService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {


  if (req.url.includes('/Auth/login')) {
    return next.handle(req);
  }

    if (localStorage.getItem('fname') && localStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          "withCredentials": "true",
          "name": "Sanat",

          Authorization: this.http.getToken()
        }
      });
    }

    
    return next.handle(req).pipe(
      catchError(err => {
       if (err.status === 401 || err.status === 403) {
      localStorage.clear();
      this.router.navigateByUrl('/login/truee');

      // ⛔ stop here, don't propagate error
      return EMPTY;
    }

    // 🟠 Database / system down
    if (err.status === 503) {
      // let service/component show message
      return throwError(() => err);
    }

    return throwError(() => err);
  })
    );

  }

}
