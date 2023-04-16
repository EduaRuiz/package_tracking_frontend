import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthModel, UserModel } from '@infrastructure/models';
import { UserDomainModel } from '@domain/models';
import { environment } from '@environments/environment';
import { UserServiceImpl } from '..';
import {
  authResponse,
  signInCommand,
  signUpCommand,
  updateUserCommand,
  user,
} from './mocks';

describe('UserServiceImpl', () => {
  let service: UserServiceImpl;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserServiceImpl],
    });
    service = TestBed.inject(UserServiceImpl);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve a user by id', (done) => {
    // Arrange
    const userId = '123';
    const expectedResponse: UserDomainModel = user;

    // Act
    service.getUser(userId).subscribe((response) => {
      // Assert
      expect(response).toEqual(expectedResponse);
      done();
    });

    // Assert
    const request = httpMock.expectOne(`${environment.apiUrl}/user/${userId}`);
    expect(request.request.method).toBe('GET');
    request.flush(expectedResponse);
  });

  it('should refresh the access token', (done) => {
    // Arrange
    const expectedResponse: AuthModel = authResponse;

    // Act
    service.refreshToken().subscribe((response) => {
      // Assert
      expect(response).toEqual(expectedResponse);
      expect(localStorage.getItem('access_token')).toBe(expectedResponse.token);
      done();
    });

    // Assert
    const request = httpMock.expectOne(
      `${environment.apiUrl}/user/token/refresh`
    );
    expect(request.request.method).toBe('GET');
    request.flush(expectedResponse);
  });

  it('should sign in a user', (done) => {
    // Arrange
    const expectedResponse: AuthModel = authResponse;

    // Act
    service.signIn(signInCommand).subscribe((response) => {
      // Assert
      expect(response).toEqual(expectedResponse);
      expect(localStorage.getItem('access_token')).toBe(expectedResponse.token);
      done();
    });

    // Assert
    const request = httpMock.expectOne(`${environment.apiUrl}/user/sign-in`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(signInCommand);
    request.flush(expectedResponse);
  });

  it('should sign up a user', (done) => {
    // Arrange
    const expectedResponse: AuthModel = authResponse;

    // Act
    service.signUp(signUpCommand).subscribe((response) => {
      // Assert
      expect(response).toEqual(expectedResponse);
      expect(localStorage.getItem('access_token')).toBe(expectedResponse.token);
      done();
    });

    // Assert
    const request = httpMock.expectOne(`${environment.apiUrl}/user/sign-up`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(signUpCommand);
    request.flush(expectedResponse);
  });

  it('should update a user', (done) => {
    // Arrange
    const expectedResponse: UserModel = user;

    // Act
    service.updateUser(updateUserCommand).subscribe((response) => {
      // Assert
      expect(response).toEqual(expectedResponse);
      done();
    });

    // Assert
    const request = httpMock.expectOne(`${environment.apiUrl}/user/update`);
    expect(request.request.method).toBe('PATCH');
    expect(request.request.body).toEqual(updateUserCommand);
    request.flush(expectedResponse);
  });

  it('should delete a user', (done) => {
    // Arrange
    const userId = '123';
    const expectedResponse: UserModel = user;

    // Act
    service.deleteUser(userId).subscribe((response) => {
      // Assert
      expect(response).toEqual(expectedResponse);
      done();
    });

    // Assert
    const request = httpMock.expectOne(
      `${environment.apiUrl}/user/delete/${userId}`
    );
    expect(request.request.method).toBe('DELETE');
    request.flush(expectedResponse);
  });
});
