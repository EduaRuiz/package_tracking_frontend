import { AuthDomainModel } from '@domain/models';
import { IUseCase } from './interface';
import { Observable } from 'rxjs';
import { ISignUpDomainCommand } from '@domain/commands';
import { IUserDomainService } from '@domain/services';

export class SignUpUseCase implements IUseCase<AuthDomainModel> {
  constructor(private readonly user$: IUserDomainService) {}

  execute(command: ISignUpDomainCommand): Observable<AuthDomainModel> {
    return this.user$.signUp(command);
  }
}
