import { IUserDomainService } from '@domain/services';
import { IUpdateUserDomainCommand } from '@domain/commands';
import { UserDomainModel } from '@domain/models';
import { of, throwError } from 'rxjs';
import { UpdateUserUseCase } from '..';
import { user } from './mocks';

describe('UpdateUserUseCase', () => {
  let user$: IUserDomainService;
  let updateUserUseCase: UpdateUserUseCase;
  let command: IUpdateUserDomainCommand;

  beforeEach(() => {
    user$ = {
      updateUser: jest.fn(),
    } as unknown as IUserDomainService;
    updateUserUseCase = new UpdateUserUseCase(user$);
    command = {
      status: 'delivered',
    } as IUpdateUserDomainCommand;
  });

  it('should be defined', () => {
    // Assert
    expect(updateUserUseCase).toBeDefined();
  });

  it('should call user$.updateUser() when execute is called', () => {
    // Arrange
    jest.spyOn(user$, 'updateUser').mockReturnValue(of(user));

    // Act
    updateUserUseCase.execute(command).subscribe();

    // Assert
    expect(user$.updateUser).toHaveBeenCalledTimes(1);
    expect(user$.updateUser).toHaveBeenCalledWith(command);
  });

  it('should return an observable that emits a UserDomainModel when execute is called', (done) => {
    // Arrange
    const expectedUser: UserDomainModel = user;
    jest.spyOn(user$, 'updateUser').mockReturnValue(of(expectedUser));

    // Act
    updateUserUseCase.execute(command).subscribe({
      next: (result) => {
        // Assert
        expect(result).toEqual(expectedUser);
        done();
      },
    });
  });

  it('should return an observable that emits an error when user$.updateUser() throws an error', (done) => {
    // Arrange
    const expectedError = new Error('Test error');
    jest
      .spyOn(user$, 'updateUser')
      .mockReturnValue(throwError(() => expectedError));

    // Act
    updateUserUseCase.execute(command).subscribe({
      error: (error) => {
        // Assert
        expect(error).toEqual(expectedError);
        done();
      },
    });
  });
});
