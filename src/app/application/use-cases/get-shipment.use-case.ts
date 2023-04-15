import { IShipmentDomainModel } from 'src/app/domain/models';
import { IShipmentDomainService } from 'src/app/domain/services';
import { IUseCase } from './interface';
import { Observable, catchError } from 'rxjs';

export class GetShipmentUseCase implements IUseCase<IShipmentDomainModel> {
  constructor(private readonly shipment$: IShipmentDomainService) {}

  execute(shipmentId: string): Observable<IShipmentDomainModel> {
    return this.shipment$.getShipment(shipmentId);
  }
}
