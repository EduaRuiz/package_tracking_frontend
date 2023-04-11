import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUserDomainService } from 'src/app/domain/services';
import { IAuthDomainModel, IUserDomainModel } from 'src/app/domain/models';

export class UserServiceImple implements IUserDomainService {
  private readonly _url: string = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  signIn(params: any): Observable<IAuthDomainModel> {
    throw new Error('Method not implemented.');
  }
  signUp(params: any): Observable<IAuthDomainModel> {
    throw new Error('Method not implemented.');
  }
  updateUser(params: any): Observable<IUserDomainModel> {
    throw new Error('Method not implemented.');
  }
  deleteUser(params: any): Observable<IUserDomainModel> {
    throw new Error('Method not implemented.');
  }
}
