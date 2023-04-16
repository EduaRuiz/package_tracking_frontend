import { IAuthDomainService } from '@domain/services';
import { SignOutUseCase } from '..';
import { of, throwError } from 'rxjs';

describe('SignOutUseCase', () => {
  let authService: IAuthDomainService;
  let signOutUseCase: SignOutUseCase;

  beforeEach(() => {
    authService = {
      signOut: jest.fn(),
    } as unknown as IAuthDomainService;
    signOutUseCase = new SignOutUseCase(authService);
  });

  it('should be defined', () => {
    // Assert
    expect(signOutUseCase).toBeDefined();
  });

  it('should call authService.signOut() when execute is called', () => {
    // Arrange
    jest.spyOn(authService, 'signOut').mockReturnValue(of(undefined));

    // Act
    signOutUseCase.execute().subscribe();

    // Assert
    expect(authService.signOut).toHaveBeenCalledTimes(1);
  });

  it('should return an observable that emits void when execute is called', (done) => {
    // Arrange
    jest.spyOn(authService, 'signOut').mockReturnValue(of(undefined));

    // Act
    signOutUseCase.execute().subscribe({
      next: (result) => {
        // Assert
        expect(result).toBeUndefined();
        done();
      },
    });
  });

  it('should return an observable that emits an error when execute is called and authService.signOut() throws an error', (done) => {
    // Arrange
    const error = new Error('error');
    jest.spyOn(authService, 'signOut').mockReturnValue(throwError(() => error));

    // Act
    signOutUseCase.execute().subscribe({
      error: (result) => {
        // Assert
        expect(result).toEqual(error);
        done();
      },
    });
  });
});
