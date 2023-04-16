import { of, throwError } from 'rxjs';
import { GetUserUseCase } from '..';
import { IUserDomainService } from '@domain/services';
import { user } from './mocks';

describe('GetUserUseCase', () => {
  let useCase: GetUserUseCase;
  let userServiceMock: IUserDomainService;

  beforeEach(() => {
    userServiceMock = {
      getUser: jest.fn(),
    } as unknown as IUserDomainService;
    useCase = new GetUserUseCase(userServiceMock);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return a user when it is retrieved successfully', (done) => {
    // Arrange
    const userId = 'user123';
    jest.spyOn(userServiceMock, 'getUser').mockReturnValue(of(user));

    // Act
    const result$ = useCase.execute(userId);

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toEqual(user);
        expect(userServiceMock.getUser).toHaveBeenCalledWith(userId);
        done();
      },
    });
  });

  it('should return an error when user retrieval fails', (done) => {
    // Arrange
    const userId = 'user123';
    const errorMessage = 'Failed to retrieve user';
    jest
      .spyOn(userServiceMock, 'getUser')
      .mockReturnValue(throwError(() => new Error(errorMessage)));

    // Act
    const result$ = useCase.execute(userId);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toEqual(new Error(errorMessage));
        expect(error.message).toEqual(errorMessage);
        expect(userServiceMock.getUser).toHaveBeenCalledWith(userId);
        done();
      },
    });
  });
});
