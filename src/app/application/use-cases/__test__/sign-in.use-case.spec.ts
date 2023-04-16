import { of, throwError } from 'rxjs';
import { AuthDomainModel } from '@domain/models';
import { HttpErrorResponse } from '@angular/common/http';
import { IAuthDomainService, IUserDomainService } from '@domain/services';
import { SignInUseCase } from '..';

describe('SignInUseCase', () => {
  let useCase: SignInUseCase;
  let userServiceMock: IUserDomainService;
  let authServiceMock: IAuthDomainService;

  beforeEach(() => {
    userServiceMock = {
      signIn: jest.fn(),
    } as unknown as IUserDomainService;
    authServiceMock = {
      getUserCredentials: jest.fn(),
    } as unknown as IAuthDomainService;
    useCase = new SignInUseCase(userServiceMock, authServiceMock);
  });

  it('should be defined', () => {
    // Assert
    expect(useCase).toBeDefined();
  });

  it('should return user credentials when sign in is successful', (done) => {
    // Arrange
    const userCredential = {
      user: {
        email: 'test@test.com',
        uid: 'user123',
        displayName: 'Test User',
      },
    };
    const authDomainModel = {
      data: {
        email: 'test@test.com',
        firebaseId: 'user123',
        name: 'Test User',
      },
    } as AuthDomainModel;
    jest
      .spyOn(authServiceMock, 'getUserCredentials')
      .mockReturnValue(of(userCredential));
    jest.spyOn(userServiceMock, 'signIn').mockReturnValue(of(authDomainModel));

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toEqual(authDomainModel);
        expect(authServiceMock.getUserCredentials).toHaveBeenCalled();
        expect(userServiceMock.signIn).toHaveBeenCalledWith({
          email: userCredential.user.email,
          firebaseId: userCredential.user.uid,
        });
        done();
      },
    });
  });

  it('should return an error when sign in fails', (done) => {
    // Arrange
    const errorResponse = {
      error: { message: ['User not found'] },
    } as HttpErrorResponse;
    jest
      .spyOn(authServiceMock, 'getUserCredentials')
      .mockReturnValue(
        of({ user: { displayName: '', uid: '', email: '' } }) as any
      );
    jest
      .spyOn(userServiceMock, 'signIn')
      .mockReturnValue(throwError(() => errorResponse));

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toEqual(errorResponse);
        expect(authServiceMock.getUserCredentials).toHaveBeenCalled();
        expect(userServiceMock.signIn).toHaveBeenCalledWith({
          email: '',
          firebaseId: '',
        });
        done();
      },
      next: () => {
        done.fail('Expected error but got next()');
      },
    });
  });
});
