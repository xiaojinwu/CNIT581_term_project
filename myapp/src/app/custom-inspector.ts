import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public router:Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = localStorage.getItem('jwt');
      if ( token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Token ${token}`
          }
        });
      }else{
        this.router.navigate(['/Account']);
      }
      return next.handle(request);
    }
  }