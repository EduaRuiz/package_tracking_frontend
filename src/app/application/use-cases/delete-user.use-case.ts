import { Observable, catchError, map, switchMap } from 'rxjs';
import { IUserDomainService } from 'src/app/domain/services';
import { IUseCase } from './interface';

export class DeleteUserUseCase implements IUseCase<string, boolean> {
  constructor(private readonly user$: IUserDomainService) {}

  execute(id: string): Observable<boolean> {
    return this.user$.deleteUser(id).pipe(
      map(() => true),
      catchError((error: Error) => {
        throw error;
      })
    );
  }
}
