import { Observable } from 'rxjs';
import { IAuthDomainModel, IUserDomainModel } from '../models';

export interface IUserDomainService {
  signIn(params: any): Observable<IAuthDomainModel>;
  signUp(params: any): Observable<IAuthDomainModel>;
  updateUser(params: any): Observable<IAuthDomainModel>;
  deleteUser(params: any): Observable<IUserDomainModel>;
}
