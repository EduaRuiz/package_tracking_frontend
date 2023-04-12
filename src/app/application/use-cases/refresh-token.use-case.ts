import { Observable, catchError, map, of } from 'rxjs';
import { IUseCase } from './interface';
import { AuthDomainModel } from '@domain/models';
import { IUserDomainService } from '@domain/services';

export class RefreshTokenUseCase implements IUseCase<boolean> {
  constructor(private readonly userService: IUserDomainService) {}

  execute(): Observable<boolean> {
    return this.userService.refreshToken().pipe(
      map((response: AuthDomainModel) => !!response),
      catchError(() => of(false))
    );
  }
}
