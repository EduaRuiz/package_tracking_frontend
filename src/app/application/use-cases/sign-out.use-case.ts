import { IAuthDomainService } from '@domain/services';
import { IUseCase } from './interface';
import { Observable } from 'rxjs';

export class SignOutUseCase implements IUseCase<void> {
  constructor(private readonly authService: IAuthDomainService) {}

  execute(): Observable<void> {
    return this.authService.signOut();
  }
}
