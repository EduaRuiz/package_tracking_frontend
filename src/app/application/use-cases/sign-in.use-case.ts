import { IUseCase } from './interface';
import { Observable, switchMap } from 'rxjs';
import { ISignInDomainCommand } from '@domain/commands';
import { AuthDomainModel } from '@domain/models';
import { IAuthDomainService, IUserDomainService } from '@domain/services';

export class SignInUseCase implements IUseCase<AuthDomainModel> {
  constructor(
    private readonly user$: IUserDomainService,
    private readonly auth$: IAuthDomainService
  ) {}

  execute(command: ISignInDomainCommand): Observable<AuthDomainModel> {
    return this.auth$.getUserCredentials().pipe(
      switchMap((userCredential) => {
        const { user } = userCredential;
        const { email, uid } = user;
        return this.user$.signIn({ email, firebaseId: uid });
      })
    );
    // return this.user$.signIn(command).pipe(
    //   catchError((error: Error) => {
    //     throw error;
    //   })
    // );
  }
}
