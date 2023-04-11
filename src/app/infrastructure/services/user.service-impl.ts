import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUserDomainService } from 'src/app/domain/services';
import { IAuthDomainModel, IUserDomainModel } from 'src/app/domain/models';
import {
  ISignInDomainCommand,
  ISignUpDomainCommand,
  IUpdateUserDomainCommand,
} from 'src/app/domain/commands';
import { Injectable } from '@angular/core';

@Injectable()
export class UserServiceImpl implements IUserDomainService {
  private readonly _url: string = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  signIn(params: ISignInDomainCommand): Observable<IAuthDomainModel> {
    const body = { ...params };
    return this.http.post<IAuthDomainModel>(`${this._url}/user/sign-in`, body);
  }
  signUp(params: ISignUpDomainCommand): Observable<IAuthDomainModel> {
    const body = { ...params };
    return this.http.post<IAuthDomainModel>(`${this._url}/user/sign-up`, body);
  }
  updateUser(params: IUpdateUserDomainCommand): Observable<IUserDomainModel> {
    const body = { ...params };
    return this.http.patch<IUserDomainModel>(`${this._url}/user/update`, body);
  }
  deleteUser(userId: string): Observable<IUserDomainModel> {
    return this.http.delete<IUserDomainModel>(
      `${this._url}/user/delete/${userId}`
    );
  }
}
