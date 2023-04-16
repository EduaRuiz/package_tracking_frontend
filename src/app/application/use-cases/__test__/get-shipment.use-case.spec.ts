import { of, throwError } from 'rxjs';
import { GetShipmentUseCase } from '..';
import { IShipmentDomainService } from '@domain/services';
import { shipment } from './mocks';

describe('GetShipmentUseCase', () => {
  let useCase: GetShipmentUseCase;
  let shipmentServiceMock: IShipmentDomainService;

  beforeEach(() => {
    shipmentServiceMock = {
      getShipment: jest.fn(),
    } as unknown as IShipmentDomainService;
    useCase = new GetShipmentUseCase(shipmentServiceMock);
  });

  it('should be defined', () => {
    // Assert
    expect(useCase).toBeDefined();
  });

  it('should return a shipment when it is retrieved successfully', (done) => {
    // Arrange
    const shipmentId = 'shipment123';
    jest
      .spyOn(shipmentServiceMock, 'getShipment')
      .mockReturnValue(of(shipment));

    // Act
    const result$ = useCase.execute(shipmentId);

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toEqual(shipment);
        expect(shipmentServiceMock.getShipment).toHaveBeenCalledWith(
          shipmentId
        );
        done();
      },
    });
  });

  it('should return an error when shipment retrieval fails', (done) => {
    // Arrange
    const shipmentId = 'shipment123';
    const errorMessage = 'Failed to retrieve shipment';
    jest
      .spyOn(shipmentServiceMock, 'getShipment')
      .mockReturnValue(throwError(() => new Error(errorMessage)));

    // Act
    const result$ = useCase.execute(shipmentId);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toEqual(new Error(errorMessage));
        expect(error.message).toEqual(errorMessage);
        expect(shipmentServiceMock.getShipment).toHaveBeenCalledWith(
          shipmentId
        );
        done();
      },
    });
  });
});
