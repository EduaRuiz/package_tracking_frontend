import { Observable, catchError } from 'rxjs';
import { IUseCase } from './interface';
import { UserDomainModel } from '@domain/models';
import { IUserDomainService } from '@domain/services';
import { IUpdateUserDomainCommand } from '@domain/commands';

export class UpdateUserUseCase implements IUseCase<UserDomainModel> {
  constructor(private readonly user$: IUserDomainService) {}

  execute(command: IUpdateUserDomainCommand): Observable<UserDomainModel> {
    return this.user$.updateUser(command);
  }
}
