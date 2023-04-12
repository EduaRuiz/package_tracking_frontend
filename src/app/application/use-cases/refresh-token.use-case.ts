import { Observable, catchError, map, of } from 'rxjs';
import { IUseCase } from './interface';
import { IUserDomainService } from 'src/app/domain';

export class RefreshTokenUseCase implements IUseCase<boolean> {
  constructor(private readonly userService: IUserDomainService) {}

  execute(): Observable<boolean> {
    return this.userService.refreshToken().pipe(
      map((response: string) => !!response),
      catchError(() => of(false))
    );
  }
}
