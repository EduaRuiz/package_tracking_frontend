import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAuthDomainModel, IUserDomainModel } from 'src/domain';
import { IUserDomainService } from 'src/domain/services';
import { environment } from 'src/environments/environment';

export class UserServiceImple implements IUserDomainService {
  private readonly _url: string = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  signIn(params: any): Observable<IAuthDomainModel> {
    throw new Error('Method not implemented.');
  }
  signUp(params: any): Observable<IAuthDomainModel> {
    throw new Error('Method not implemented.');
  }
  updateUser(params: any): Observable<IAuthDomainModel> {
    throw new Error('Method not implemented.');
  }
  deleteUser(params: any): Observable<IUserDomainModel> {
    throw new Error('Method not implemented.');
  }
}
