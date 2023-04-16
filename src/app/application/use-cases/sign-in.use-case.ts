import { IUseCase } from './interface';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { AuthDomainModel } from '@domain/models';
import { IAuthDomainService, IUserDomainService } from '@domain/services';
import { HttpErrorResponse } from '@angular/common/http';

export class SignInUseCase implements IUseCase<AuthDomainModel> {
  constructor(
    private readonly user$: IUserDomainService,
    private readonly auth$: IAuthDomainService
  ) {}

  execute(): Observable<AuthDomainModel> {
    return this.auth$.getUserCredentials().pipe(
      switchMap((userCredential: any) => {
        const { user } = userCredential;
        const { email, uid, displayName } = user;
        return this.user$.signIn({ email, firebaseId: uid }).pipe(
          catchError((error: HttpErrorResponse) => {
            return error.error.message === 'User not found'
              ? of({
                  data: { email, firebaseId: uid, name: displayName },
                } as AuthDomainModel)
              : throwError(() => error);
          })
        );
      })
    );
  }
}
