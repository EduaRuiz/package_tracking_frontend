import { Observable, catchError } from 'rxjs';
import { IUpdateUserDomainCommand } from 'src/app/domain/commands';
import { IUserDomainModel } from 'src/app/domain/models';
import { IUserDomainService } from 'src/app/domain/services';
import { IUseCase } from './interface';

export class UpdateUserUseCase implements IUseCase<IUserDomainModel> {
  constructor(private readonly user$: IUserDomainService) {}

  execute(command: IUpdateUserDomainCommand): Observable<IUserDomainModel> {
    return this.user$.updateUser(command).pipe(
      catchError((error: Error) => {
        throw error;
      })
    );
  }
}
