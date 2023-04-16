import { of, throwError } from 'rxjs';
import { AuthDomainModel } from '@domain/models';
import { IUserDomainService } from '@domain/services';
import { RefreshTokenUseCase } from '..';

describe('RefreshTokenUseCase', () => {
  let useCase: RefreshTokenUseCase;
  let userServiceMock: IUserDomainService;

  beforeEach(() => {
    userServiceMock = {
      refreshToken: jest.fn(),
    } as unknown as IUserDomainService;
    useCase = new RefreshTokenUseCase(userServiceMock);
  });

  it('should be defined', () => {
    // Assert
    expect(useCase).toBeDefined();
  });

  it('should return true when token is refreshed successfully', (done) => {
    // Arrange
    jest
      .spyOn(userServiceMock, 'refreshToken')
      .mockReturnValue(of({ token: 'newToken' } as AuthDomainModel));

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toBe(true);
        expect(userServiceMock.refreshToken).toHaveBeenCalled();
        done();
      },
    });
  });

  it('should return false when token refresh fails', (done) => {
    // Arrange
    const errorMessage = 'Failed to refresh token';
    jest
      .spyOn(userServiceMock, 'refreshToken')
      .mockReturnValue(throwError(() => new Error(errorMessage)));

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toEqual(new Error(errorMessage));
        expect(userServiceMock.refreshToken).toHaveBeenCalled();
        done();
      },
      next: (result) => {
        expect(result).toBe(false);
        done();
      },
    });
  });
});
