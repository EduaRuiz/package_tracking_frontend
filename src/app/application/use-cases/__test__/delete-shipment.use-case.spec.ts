import { IShipmentDomainService } from '@domain/services';
import { DeleteShipmentUseCase } from '..';
import { of, throwError } from 'rxjs';
import { shipment } from './mocks';

describe('DeleteShipmentUseCase', () => {
  let useCase: DeleteShipmentUseCase;
  let shipmentServiceMock: IShipmentDomainService;

  beforeEach(() => {
    shipmentServiceMock = {
      deleteShipment: jest.fn(),
    } as unknown as IShipmentDomainService;
    useCase = new DeleteShipmentUseCase(shipmentServiceMock);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return true when shipment is deleted successfully', (done) => {
    // Arrange
    const shipmentId = 'shipment123';
    jest
      .spyOn(shipmentServiceMock, 'deleteShipment')
      .mockReturnValue(of(shipment));

    // Act
    const result$ = useCase.execute(shipmentId);

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toBe(true);
        expect(shipmentServiceMock.deleteShipment).toHaveBeenCalledWith(
          shipmentId
        );
        done();
      },
    });
  });

  it('should return an error when shipment deletion fails', (done) => {
    // Arrange
    const shipmentId = 'shipment123';
    const errorMessage = 'Failed to delete shipment';
    jest
      .spyOn(shipmentServiceMock, 'deleteShipment')
      .mockReturnValue(throwError(() => new Error(errorMessage)));

    // Act
    const result$ = useCase.execute(shipmentId);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toEqual(new Error(errorMessage));
        expect(shipmentServiceMock.deleteShipment).toHaveBeenCalledWith(
          shipmentId
        );
        done();
      },
    });
  });
});
