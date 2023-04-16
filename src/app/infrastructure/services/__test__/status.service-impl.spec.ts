import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { StatusModel } from '@infrastructure/models';
import { StatusServiceImpl } from '..';
import { status } from './mocks';
import { environment } from '@environments/environment';

describe('StatusServiceImpl', () => {
  let service: StatusServiceImpl;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StatusServiceImpl],
    });
    service = TestBed.inject(StatusServiceImpl);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve a status by id', (done) => {
    // Arrange
    const statusId = '123';
    const expectedResponse: StatusModel = status;

    // Act
    service.getStatus(statusId).subscribe((response) => {
      // Assert
      expect(response).toEqual(expectedResponse);
      done();
    });

    // Assert
    const request = httpMock.expectOne(
      `${environment.apiUrl}/status/${statusId}`
    );
    expect(request.request.method).toBe('GET');
    request.flush(expectedResponse);
  });
});
