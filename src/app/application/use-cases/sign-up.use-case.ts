import { ISignUpDomainCommand } from 'src/app/domain/commands';
import { IUseCase } from './interface';
import { IAuthDomainModel } from 'src/app/domain/models';
import { IUserDomainService } from 'src/app/domain/services';
import { Observable, catchError } from 'rxjs';

export class SignUpUseCase
  implements IUseCase<ISignUpDomainCommand, IAuthDomainModel>
{
  constructor(private readonly user$: IUserDomainService) {}

  execute(params: ISignUpDomainCommand): Observable<IAuthDomainModel> {
    return this.user$.signUp(params).pipe(
      catchError((error: Error) => {
        throw error;
      })
    );
  }
}