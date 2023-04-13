// Libraries
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

//Services
import { PackageTrackingDelegate } from '@application/delegator';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly delegate: PackageTrackingDelegate,
    private readonly router: Router
  ) {}

  canActivate(): Observable<boolean> {
    this.delegate.toRefreshToken();
    return this.delegate.execute<boolean>().pipe(
      tap((valid) => {
        !valid && localStorage.removeItem('access_token');
        !valid && this.router.navigate(['index']);
      })
    );
  }
}
