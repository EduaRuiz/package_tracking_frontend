import { TestBed } from '@angular/core/testing';
import {
  Auth,
  signInWithPopup,
  UserCredential,
  signOut,
  provideAuth,
  getAuth,
  AuthModule,
} from '@angular/fire/auth';
import { lastValueFrom, of } from 'rxjs';
import { AuthServiceImpl } from '.';
import {
  FirebaseApp,
  FirebaseAppModule,
  initializeApp,
  provideFirebaseApp,
} from '@angular/fire/app';
import { environment } from '@environments/environment';

describe('AuthServiceImpl', () => {
  let service: AuthServiceImpl;
  let authMock: Auth;

  beforeEach(() => {
    authMock = { signInWithPopup } as unknown as Auth;
    TestBed.configureTestingModule({
      providers: [
        AuthServiceImpl,
        { provide: Auth, useValue: authMock },
        {
          provide: FirebaseApp,
          useFactory: () => initializeApp(environment.firebase),
        },
      ],
    });

    service = TestBed.inject(AuthServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service).toBeInstanceOf(AuthServiceImpl);
    expect(service).toHaveProperty('auth', authMock);
    expect(service).toBeDefined();
  });

  // describe('#getUserCredentials', () => {
  //   it('should call signInWithPopup with the provided auth and a new GoogleAuthProvider', async () => {
  //     const signInWithPopupSpy = jest.spyOn(signInWithPopup as any, 'bind');
  //     const userCredentialMock: UserCredential =
  //       {} as unknown as UserCredential;

  //     jest
  //       .spyOn(signInWithPopup as any, 'bind')
  //       .mockReturnValue(await lastValueFrom(of(userCredentialMock)));

  //     const result = service.getUserCredentials();

  //     expect(signInWithPopupSpy).toHaveBeenCalledWith(
  //       authMock,
  //       expect.anything()
  //     );
  //     expect(result).toEqual(userCredentialMock);
  //   });
  // });

  // describe('#signOut', () => {
  //   it('should call signOut and clear local storage', async () => {
  //     const signOutSpy = jest.spyOn(signOut, 'bind');
  //     const localStorageSpy = jest.spyOn(localStorage, 'clear');

  //     jest.spyOn(signOut, 'bind').mockReturnValue(of(undefined).toPromise());

  //     await service.signOut().toPromise();

  //     expect(signOutSpy).toHaveBeenCalledWith(authMock);
  //     expect(localStorageSpy).toHaveBeenCalled();
  //   });
  // });
});
