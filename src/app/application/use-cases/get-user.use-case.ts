import { UserDomainModel } from '@domain/models';
import { IUserDomainService } from '@domain/services';
import { Observable } from 'rxjs';
import { IUseCase } from './interface';

export class GetUserUseCase implements IUseCase<UserDomainModel> {
  constructor(private readonly user$: IUserDomainService) {}

  execute(userId: string): Observable<UserDomainModel> {
    return this.user$.getUser(userId);
  }
}
