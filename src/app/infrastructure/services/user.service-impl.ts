import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { IUserDomainService } from '@domain/services';
import { AuthModel, UserModel } from '@infrastructure/models';
import {
  SignInCommand,
  SignUpCommand,
  UpdateUserCommand,
} from '@infrastructure/commands';

@Injectable()
export class UserServiceImpl implements IUserDomainService {
  private readonly _url: string = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  refreshToken(): Observable<AuthModel> {
    return this.http.get<AuthModel>(`${this._url}/user/token/refresh`).pipe(
      tap((value: AuthModel) => {
        localStorage.setItem('access_token', value.token);
      })
    );
  }

  signIn(params: SignInCommand): Observable<AuthModel> {
    const body = { ...params };
    return this.http.post<AuthModel>(`${this._url}/user/sign-in`, body).pipe(
      tap((value: AuthModel) => {
        localStorage.setItem('access_token', value.token);
      })
    );
  }

  signUp(params: SignUpCommand): Observable<AuthModel> {
    const body = { ...params };
    return this.http.post<AuthModel>(`${this._url}/user/sign-up`, body).pipe(
      tap((value: AuthModel) => {
        localStorage.setItem('access_token', value.token);
      })
    );
  }

  updateUser(params: UpdateUserCommand): Observable<UserModel> {
    const body = { ...params };
    return this.http.patch<UserModel>(`${this._url}/user/update`, body);
  }

  deleteUser(userId: string): Observable<UserModel> {
    return this.http.delete<UserModel>(`${this._url}/user/delete/${userId}`);
  }
}
