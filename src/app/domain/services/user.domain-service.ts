import { Observable } from 'rxjs';
import { IAuthDomainModel, IUserDomainModel } from '../models';
import {
  ISignInDomainCommand,
  ISignUpDomainCommand,
  IUpdateUserDomainCommand,
} from '../commands';

export interface IUserDomainService {
  signIn(command: ISignInDomainCommand): Observable<IAuthDomainModel>;
  signUp(command: ISignUpDomainCommand): Observable<IAuthDomainModel>;
  updateUser(command: IUpdateUserDomainCommand): Observable<IUserDomainModel>;
  deleteUser(userId: string): Observable<IUserDomainModel>;
  refreshToken(): Observable<string>;
}
