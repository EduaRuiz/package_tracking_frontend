import { Observable, catchError, map, switchMap } from 'rxjs';
import { IUserDomainService } from 'src/app/domain/services';
import { IUseCase } from './interface';

export class DeleteUserUseCase implements IUseCase<boolean> {
  constructor(private readonly user$: IUserDomainService) {}

  execute(userId: string): Observable<boolean> {
    return this.user$.deleteUser(userId).pipe(map(() => true));
  }
}
