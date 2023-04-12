import { IAuthDomainService } from '@domain/services';

import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  signOut,
} from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Observable, from, tap } from 'rxjs';

@Injectable()
export class AuthServiceImpl implements IAuthDomainService<UserCredential> {
  constructor(private readonly auth: Auth) {}

  getUserCredentials(): Observable<UserCredential> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider()));
  }

  signOut(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      tap(() => {
        localStorage.removeItem('access_token');
      })
    );
  }
}
