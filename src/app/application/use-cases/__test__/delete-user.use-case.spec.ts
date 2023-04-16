import { IUserDomainService } from '@domain/services';
import { DeleteUserUseCase } from '..';
import { of, throwError } from 'rxjs';
import { user } from './mocks';

describe('DeleteUserUseCase', () => {
  let useCase: DeleteUserUseCase;
  let userServiceMock: IUserDomainService;

  beforeEach(() => {
    userServiceMock = {
      deleteUser: jest.fn(),
    } as unknown as IUserDomainService;
    useCase = new DeleteUserUseCase(userServiceMock);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return true when user is deleted successfully', (done) => {
    // Arrange
    const userId = 'user123';
    jest.spyOn(userServiceMock, 'deleteUser').mockReturnValue(of(user));

    // Act
    const result$ = useCase.execute(userId);

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toBe(true);
        expect(userServiceMock.deleteUser).toHaveBeenCalledWith(userId);
        done();
      },
    });
  });

  it('should return an error when user deletion fails', (done) => {
    // Arrange
    const userId = 'user123';
    const errorMessage = 'Failed to delete user';
    jest
      .spyOn(userServiceMock, 'deleteUser')
      .mockReturnValue(throwError(() => new Error(errorMessage)));

    // Act
    const result$ = useCase.execute(userId);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toEqual(new Error(errorMessage));
        expect(userServiceMock.deleteUser).toHaveBeenCalledWith(userId);
        done();
      },
    });
  });
});
