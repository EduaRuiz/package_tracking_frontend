import { TestBed } from '@angular/core/testing';
import { Auth, UserCredential } from '@angular/fire/auth';
import { of } from 'rxjs';
import { AuthServiceImpl } from '.';

describe('AuthServiceImpl', () => {
  let service: AuthServiceImpl;
  let authMock: Auth;

  beforeEach(() => {
    // Arrange
    authMock = {} as unknown as Auth;
    TestBed.configureTestingModule({
      providers: [AuthServiceImpl, { provide: Auth, useValue: authMock }],
    });
    service = TestBed.inject(AuthServiceImpl);
  });

  it('should be created', () => {
    // Assert
    expect(service).toBeTruthy();
  });

  describe('#getUserCredentials', () => {
    it('should call signInWithPopup with the provided auth and a new GoogleAuthProvider', (done) => {
      // Arrange
      const userCredentialMock: UserCredential =
        {} as unknown as UserCredential;
      (service as any).signPopUp = jest
        .fn()
        .mockReturnValue(of(userCredentialMock).toPromise());

      // Act
      const result = service.getUserCredentials();

      // Assert
      result.subscribe((userCredential) => {
        expect(userCredential).toEqual(userCredentialMock);
        done();
      });
    });
  });

  describe('#signOut', () => {
    it('should call signOut and clear local storage', (done) => {
      // Arrange
      (service as any).signOutProperty = jest
        .fn()
        .mockReturnValue(of(undefined).toPromise());
      const signOutSpy = jest.spyOn(service as any, 'signOutProperty');

      // Act
      const result = service.signOut();

      // Assert
      result.subscribe({
        next: () => {
          expect(signOutSpy).toHaveBeenCalledWith(authMock);
          done();
        },
      });
    });
  });
});
