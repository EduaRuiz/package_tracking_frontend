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

  it('should add Authorization header with access token', (done) => {
    // Arrange
    const accessToken = 'test-access-token';
    localStorage.setItem('access_token', accessToken);

    // Act
    const result = httpClient.get('http://test.com/data');

    // Assert
    result.subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
        done();
      },
    });

    // Assert
    const req = httpMock.expectOne('http://test.com/data');
    expect(req.request.headers.has('Authorization')).toEqual(true);
    expect(req.request.headers.get('Authorization')).toEqual(
      `Bearer ${accessToken}`
    );
    req.flush(new HttpResponse({ status: 200 }));
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

    const result = httpClient.get('http://test.com/data').pipe(
      map((response) => {
        throwError(() => new Error(errorMessage));
      })
    );

    // Act
    result.subscribe({
      next: (response) => {
        // Assert
        expect(response).toBeTruthy();
        done();
      },
      error: (error) => {
        // Assert
        expect(JSON.stringify(error)).toContain(errorMessage);
        done();
      },
    });

    // Assert
    const req = httpMock.expectOne('http://test.com/data');
    expect(req.request.headers.has('Authorization')).toEqual(true);
    req.error(errorResponse as any);
  });
});
