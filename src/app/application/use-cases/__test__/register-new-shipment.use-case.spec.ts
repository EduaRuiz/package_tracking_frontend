import { of, throwError } from 'rxjs';
import { INewShipmentDomainCommand } from 'src/app/domain/commands';
import { ShipmentDomainModel } from '@domain/models';
import { IShipmentDomainService } from 'src/app/domain/services';
import { RegisterNewShipmentUseCase } from '..';
import { shipment } from './mocks';

describe('RegisterNewShipmentUseCase', () => {
  let useCase: RegisterNewShipmentUseCase;
  let shipmentServiceMock: IShipmentDomainService;
  const newShipment: INewShipmentDomainCommand = { ...shipment };

  beforeEach(() => {
    shipmentServiceMock = {
      createShipment: jest.fn(),
    } as unknown as IShipmentDomainService;
    useCase = new RegisterNewShipmentUseCase(shipmentServiceMock);
  });

  it('should be defined', () => {
    // Assert
    expect(useCase).toBeDefined();
  });

  it('should return a shipment domain model when shipment is created successfully', (done) => {
    // Arrange
    const shipment = { id: 'shipmentId' } as unknown as ShipmentDomainModel;
    jest
      .spyOn(shipmentServiceMock, 'createShipment')
      .mockReturnValue(of(shipment));

    // Act
    const result$ = useCase.execute(newShipment);

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toEqual(shipment);
        expect(shipmentServiceMock.createShipment).toHaveBeenCalledWith(
          newShipment
        );
        done();
      },
    });
  });

  it('should return an error when shipment creation fails', (done) => {
    // Arrange
    const errorMessage = 'Failed to create shipment';
    jest
      .spyOn(shipmentServiceMock, 'createShipment')
      .mockReturnValue(throwError(() => new Error(errorMessage)));

    // Act
    const result$ = useCase.execute(newShipment);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toEqual(new Error(errorMessage));
        expect(shipmentServiceMock.createShipment).toHaveBeenCalledWith(
          newShipment
        );
        done();
      },
    });
  });
});
