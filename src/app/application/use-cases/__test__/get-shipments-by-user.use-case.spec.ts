import { of, throwError } from 'rxjs';
import { GetShipmentsByUserUseCase } from '..';
import { IShipmentDomainService } from '@domain/services';
import { shipment } from './mocks';

describe('GetShipmentsByUserUseCase', () => {
  let useCase: GetShipmentsByUserUseCase;
  let shipmentServiceMock: IShipmentDomainService;

  beforeEach(() => {
    shipmentServiceMock = {
      getShipmentsByUser: jest.fn(),
    } as unknown as IShipmentDomainService;
    useCase = new GetShipmentsByUserUseCase(shipmentServiceMock);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return a shipment list when it is retrieved successfully', (done) => {
    // Arrange
    jest
      .spyOn(shipmentServiceMock, 'getShipmentsByUser')
      .mockReturnValue(of([shipment]));

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toEqual([shipment]);
        expect(shipmentServiceMock.getShipmentsByUser).toHaveBeenCalledWith();
        done();
      },
    });
  });

  it('should return an error when shipment retrieval fails', (done) => {
    // Arrange
    const errorMessage = 'Failed to retrieve shipment';
    jest
      .spyOn(shipmentServiceMock, 'getShipmentsByUser')
      .mockReturnValue(throwError(() => new Error(errorMessage)));

    // Act
    const result$ = useCase.execute();

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toEqual(new Error(errorMessage));
        expect(error.message).toEqual(errorMessage);
        expect(shipmentServiceMock.getShipmentsByUser).toHaveBeenCalledWith();
        done();
      },
    });
  });
});
