import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  NewShipmentCommand,
  UpdateShipmentCommand,
} from '@infrastructure/commands';
import { ShipmentModel } from '@infrastructure/models';
import { ShipmentServiceImpl } from '..';
import { newShipmentCommand, shipment } from './mocks';

describe('ShipmentService', () => {
  let service: ShipmentServiceImpl;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShipmentServiceImpl],
    });

    service = TestBed.inject(ShipmentServiceImpl);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('createShipment', () => {
    it('should create a shipment', (done) => {
      // Arrange
      const command: NewShipmentCommand = newShipmentCommand;
      const expectedResponse: ShipmentModel = shipment;

      // Act
      service.createShipment(command).subscribe((response) => {
        // Assert
        expect(response).toEqual(expectedResponse);
        done();
      });

      // Assert
      const request = httpMock.expectOne(`${service['_url']}/shipment/create`);
      expect(request.request.method).toBe('POST');
      request.flush(expectedResponse);
    });
  });

  describe('updateShipment', () => {
    it('should update a shipment', (done) => {
      // Arrange
      const command: UpdateShipmentCommand = {
        /* set command properties */
      };
      const shipmentId = '123';
      const expectedResponse: ShipmentModel = shipment;

      // Act
      service.updateShipment(command, shipmentId).subscribe((response) => {
        // Assert
        expect(response).toEqual(expectedResponse);
        done();
      });

      // Assert
      const request = httpMock.expectOne(
        `${service['_url']}/shipment/update/${shipmentId}`
      );
      expect(request.request.method).toBe('PATCH');
      request.flush(expectedResponse);
    });
  });

  describe('deleteShipment', () => {
    it('should delete a shipment', (done) => {
      // Arrange
      const shipmentId = '123';
      const expectedResponse: ShipmentModel = shipment;

      // Act
      service.deleteShipment(shipmentId).subscribe((response) => {
        // Assert
        expect(response).toEqual(expectedResponse);
        done();
      });

      // Assert
      const request = httpMock.expectOne(
        `${service['_url']}/shipment/delete/${shipmentId}`
      );
      expect(request.request.method).toBe('DELETE');
      request.flush(expectedResponse);
    });
  });

  describe('getShipmentsByUser', () => {
    it('should get shipments by user', (done) => {
      // Arrange
      const expectedResponse: ShipmentModel[] = [shipment];

      // Act
      service.getShipmentsByUser().subscribe((response) => {
        // Assert
        expect(response).toEqual(expectedResponse);
        done();
      });

      // Assert
      const request = httpMock.expectOne(`${service['_url']}/shipment/all`);
      expect(request.request.method).toBe('GET');
      request.flush(expectedResponse);
    });
  });

  describe('getShipment', () => {
    it('should get a shipment', (done) => {
      // Arrange
      const shipmentId = '123';
      const expectedResponse: ShipmentModel = shipment;

      // Act
      service.getShipment(shipmentId).subscribe((response) => {
        // Assert
        expect(response).toEqual(expectedResponse);
        done();
      });

      // Assert
      const request = httpMock.expectOne(
        `${service['_url']}/shipment/${shipmentId}`
      );
      expect(request.request.method).toBe('GET');
      request.flush(expectedResponse);
    });
  });
});
