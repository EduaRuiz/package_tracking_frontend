import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { map, switchMap, throwError } from 'rxjs';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header with access token', () => {
    // Arrange
    const accessToken = 'test-access-token';
    localStorage.setItem('access_token', accessToken);

    // Act
    httpClient.get('http://test.com/data').subscribe((response) => {
      // Assert
      expect(response).toBeTruthy();
    });

    // Assert
    const req = httpMock.expectOne('http://test.com/data');
    expect(req.request.headers.has('Authorization')).toEqual(true);
    expect(req.request.headers.get('Authorization')).toEqual(
      `Bearer ${accessToken}`
    );
    req.flush(new HttpResponse({ status: 200 }));
  });

  it('should handle HTTP errors', () => {
    // Arrange
    const accessToken = 'test-access-token';
    const errorMessage = 'HTTP error occurred';
    const status = 404;
    const errorResponse = new HttpErrorResponse({
      error: errorMessage,
      status: status,
      statusText: 'Not Found',
    });

    jest.spyOn(console, 'warn');
    jest.spyOn(console, 'error');
    jest.spyOn(console, 'log');
    jest.spyOn(console, 'info');

    // Act
    httpClient.get('http://test.com/data').subscribe((error) => {
      // Assert
      expect(error).toEqual(errorMessage);
      expect(console.warn).toHaveBeenCalledWith(
        'We have an error: ',
        errorResponse
      );
      expect(console.error).not.toHaveBeenCalled();
      expect(console.log).not.toHaveBeenCalled();
      expect(console.info).not.toHaveBeenCalled();
    });

    // Assert
    const req = httpMock.expectOne('http://test.com/data');
    expect(req.request.headers.has('Authorization')).toEqual(true);
    expect(req.request.headers.get('Authorization')).toEqual(
      `Bearer ${accessToken}`
    );
  });

  it('should re-throw errors if errorHandler fails', () => {
    // Arrange
    const accessToken = 'test-access-token';
    const errorMessage = 'HTTP error occurred';
    const status = 404;
    const errorResponse = new HttpErrorResponse({
      error: errorMessage,
      status: status,
      statusText: 'Not Found',
    });

    jest.spyOn(console, 'warn');
    jest.spyOn(console, 'error');
    jest.spyOn(console, 'log');
    jest.spyOn(console, 'info');

    // Act
    httpClient.get('http://test.com/data').subscribe((error) => {
      // Assert
      expect(error).toEqual(errorResponse);
      expect(console.warn).toHaveBeenCalledWith(
        'We have an error: ',
        errorResponse
      );
      expect(console.error).not.toHaveBeenCalled();
      expect(console.log).not.toHaveBeenCalled();
      expect(console.info).not.toHaveBeenCalled();
    });

    // Assert
    const req = httpMock.expectOne('http://test.com/data');
    expect(req.request.headers.has('Authorization')).toEqual(true);
    // expect(req.request.headers.get('Authorization')).toEqual(
    //   `Bearer ${accessToken}`
    // );
  });

  it('should handle HTTP errors', (done) => {
    // Arrange
    const errorMessage = 'HTTP error occurred';
    const status = 404;
    const errorResponse = new HttpErrorResponse({
      error: errorMessage,
      status: status,
      statusText: 'Not Found',
    });
    jest.spyOn(console, 'warn');

    // Act
    httpClient.get('http://test.com/data').subscribe((error) => {
      // Assert
      expect(JSON.stringify(error)).toContain(errorMessage);
      done();
    });

    // Assert
    const req = httpMock.expectOne('http://test.com/data');
    expect(req.request.headers.has('Authorization')).toEqual(true);
    req.error(errorResponse as any);
  });
});
