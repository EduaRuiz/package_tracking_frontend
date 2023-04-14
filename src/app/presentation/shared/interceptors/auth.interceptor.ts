import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, catchError, throwError } from 'rxjs';

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
    return next.handle(authReq).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    console.warn('We have an error: ', error);
    return throwError(() => error);
  }
}
