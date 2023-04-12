import { Observable } from 'rxjs';

export interface IAuthDomainService<Response = any> {
  getUserCredentials(): Observable<Response>;
  signOut(): Observable<void>;
}
