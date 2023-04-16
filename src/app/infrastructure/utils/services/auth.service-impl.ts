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
  private signPopUp = signInWithPopup;
  private signOutProperty = signOut;

  constructor(private readonly auth: Auth) {}

  getUserCredentials(): Observable<UserCredential> {
    return from(this.signPopUp(this.auth, new GoogleAuthProvider()));
  }

  signOut(): Observable<void> {
    return from(this.signOutProperty(this.auth)).pipe(
      tap(() => {
        localStorage.clear();
      })
    );
  }
}
