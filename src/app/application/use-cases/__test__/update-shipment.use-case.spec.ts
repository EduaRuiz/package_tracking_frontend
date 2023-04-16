import { IShipmentDomainService } from '@domain/services';
import { IUpdateShipmentDomainCommand } from '@domain/commands';
import { ShipmentDomainModel } from '@domain/models';
import { of, throwError } from 'rxjs';
import { UpdateShipmentUseCase } from '..';
import { shipment } from './mocks';

describe('UpdateShipmentUseCase', () => {
  let shipment$: IShipmentDomainService;
  let updateShipmentUseCase: UpdateShipmentUseCase;
  let command: IUpdateShipmentDomainCommand;
  let shipmentId: string;

  beforeEach(() => {
    shipment$ = {
      updateShipment: jest.fn(),
    } as unknown as IShipmentDomainService;
    updateShipmentUseCase = new UpdateShipmentUseCase(shipment$);
    command = {
      status: 'delivered',
    } as IUpdateShipmentDomainCommand;
    shipmentId = 'testshipmentid';
  });

  it('should be defined', () => {
    // Assert
    expect(updateShipmentUseCase).toBeDefined();
  });

  it('should call shipment$.updateShipment() when execute is called', () => {
    // Arrange
    jest.spyOn(shipment$, 'updateShipment').mockReturnValue(of(shipment));

    // Act
    updateShipmentUseCase.execute(command, shipmentId).subscribe();

    // Assert
    expect(shipment$.updateShipment).toHaveBeenCalledTimes(1);
    expect(shipment$.updateShipment).toHaveBeenCalledWith(command, shipmentId);
  });

  it('should return an observable that emits a ShipmentDomainModel when execute is called', (done) => {
    // Arrange
    const expectedShipment: ShipmentDomainModel = shipment;
    jest
      .spyOn(shipment$, 'updateShipment')
      .mockReturnValue(of(expectedShipment));

    // Act
    updateShipmentUseCase.execute(command, shipmentId).subscribe({
      next: (result) => {
        // Assert
        expect(result).toEqual(expectedShipment);
        done();
      },
    });
  });

  it('should return an observable that emits an error when shipment$.updateShipment() throws an error', (done) => {
    // Arrange
    const expectedError = new Error('Test error');
    jest
      .spyOn(shipment$, 'updateShipment')
      .mockReturnValue(throwError(() => expectedError));

    // Act
    updateShipmentUseCase.execute(command, shipmentId).subscribe({
      error: (error) => {
        // Assert
        expect(error).toEqual(expectedError);
        done();
      },
    });
  });
});
