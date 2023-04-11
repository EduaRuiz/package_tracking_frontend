import { ISignInDomainCommand } from 'src/app/domain/commands';
import { IUseCase } from './interface';
import { Observable, catchError } from 'rxjs';
import { IAuthDomainModel } from 'src/app/domain/models';
import { IUserDomainService } from 'src/app/domain/services';

export class SignInUseCase
  implements IUseCase<ISignInDomainCommand, IAuthDomainModel>
{
  constructor(private readonly user$: IUserDomainService) {}

  execute(params: ISignInDomainCommand): Observable<IAuthDomainModel> {
    return this.user$.signIn(params).pipe(
      catchError((error: Error) => {
        throw error;
      })
    );
  }
}
