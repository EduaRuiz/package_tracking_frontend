import { Observable, catchError } from 'rxjs';
import { ShipmentDomainModel } from '@domain/models';
import { IShipmentDomainService } from '@domain/services';
import { IUpdateShipmentDomainCommand } from '@domain/commands';
import { IUseCase } from './interface';

export class UpdateShipmentUseCase implements IUseCase<ShipmentDomainModel> {
  constructor(private readonly shipment$: IShipmentDomainService) {}

  execute(
    command: IUpdateShipmentDomainCommand,
    shipmentId: string
  ): Observable<ShipmentDomainModel> {
    return this.shipment$.updateShipment(command, shipmentId);
  }
}
