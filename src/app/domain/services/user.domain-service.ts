import { Observable } from 'rxjs';
import {
  ISignInDomainCommand,
  ISignUpDomainCommand,
  IUpdateUserDomainCommand,
} from '../commands';
import { AuthDomainModel, UserDomainModel } from '@domain/models';

export interface IUserDomainService {
  signIn(command: ISignInDomainCommand): Observable<AuthDomainModel>;
  signUp(command: ISignUpDomainCommand): Observable<AuthDomainModel>;
  updateUser(command: IUpdateUserDomainCommand): Observable<UserDomainModel>;
  deleteUser(userId: string): Observable<UserDomainModel>;
  refreshToken(): Observable<AuthDomainModel>;
}
