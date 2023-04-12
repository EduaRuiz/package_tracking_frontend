import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { Observable, filter, map, tap } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('access_token') ?? '';
    const authReq = req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json'),
    });
    console.log(authReq);
    return next.handle(authReq);
  }
}
