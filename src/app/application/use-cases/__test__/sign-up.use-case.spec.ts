import { IUserDomainService } from '@domain/services';
import { ISignUpDomainCommand } from '@domain/commands';
import { AuthDomainModel } from '@domain/models';
import { of, throwError } from 'rxjs';
import { SignUpUseCase } from '..';
import { authResponse, signUpCommand, user } from './mocks';

describe('SignUpUseCase', () => {
  let user$: IUserDomainService;
  let signUpUseCase: SignUpUseCase;
  let command: ISignUpDomainCommand;

  beforeEach(() => {
    user$ = {
      signUp: jest.fn(),
    } as unknown as IUserDomainService;
    signUpUseCase = new SignUpUseCase(user$);
    command = signUpCommand;
  });

  it('should be defined', () => {
    // Assert
    expect(signUpUseCase).toBeDefined();
  });

  it('should call user$.signUp() when execute is called', () => {
    // Arrange
    jest.spyOn(user$, 'signUp').mockReturnValue(of(authResponse));

    // Act
    signUpUseCase.execute(command).subscribe();

    // Assert
    expect(user$.signUp).toHaveBeenCalledTimes(1);
    expect(user$.signUp).toHaveBeenCalledWith(command);
  });

  it('should return an observable that emits an AuthDomainModel when execute is called', (done) => {
    // Arrange
    const expectedAuthDomainModel: AuthDomainModel = authResponse;
    jest.spyOn(user$, 'signUp').mockReturnValue(of(expectedAuthDomainModel));

    // Act
    signUpUseCase.execute(command).subscribe({
      next: (result) => {
        // Assert
        expect(result).toEqual(expectedAuthDomainModel);
        done();
      },
    });
  });

  it('should return an observable that emits an error when execute is called and user$.signUp() throws an error', (done) => {
    // Arrange
    const error = new Error('error');
    jest.spyOn(user$, 'signUp').mockReturnValue(throwError(() => error));

    // Act
    signUpUseCase.execute(command).subscribe({
      error: (result) => {
        // Assert
        expect(result).toEqual(error);
        done();
      },
    });
  });
});
