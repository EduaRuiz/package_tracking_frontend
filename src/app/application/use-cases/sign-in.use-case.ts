import { IUseCase } from './interface';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { AuthDomainModel } from '@domain/models';
import { IAuthDomainService, IUserDomainService } from '@domain/services';

export class SignInUseCase implements IUseCase<AuthDomainModel> {
  constructor(
    private readonly user$: IUserDomainService,
    private readonly auth$: IAuthDomainService
  ) {}

  execute(): Observable<AuthDomainModel> {
    return this.auth$.getUserCredentials().pipe(
      switchMap((userCredential) => {
        const { user } = userCredential;
        const { email, uid, displayName } = user;
        return this.user$.signIn({ email, firebaseId: uid }).pipe(
          catchError((error: Error) => {
            return of({
              data: { email, firebaseId: uid, name: displayName },
            } as AuthDomainModel);
            // : throwError(() => error);
          })
        );
      })
    );
  }
}
