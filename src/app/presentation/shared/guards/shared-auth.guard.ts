import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedGuard implements CanActivate, CanLoad {
  constructor(private readonly router: Router) {}

  canActivate(): Observable<boolean> {
    return of(localStorage.getItem('access_token')).pipe(
      map((access_token: string | null) => {
        access_token && this.router.navigate(['dashboard']);
        return !access_token;
      })
    );
  }

  canLoad(): Observable<boolean> {
    return of(localStorage.getItem('access_token')).pipe(
      map((access_token: string | null) => {
        access_token && this.router.navigate(['dashboard']);
        return !access_token;
      })
    );
  }
}
