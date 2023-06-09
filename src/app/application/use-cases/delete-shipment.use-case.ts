import { Observable, map } from 'rxjs';
import { IShipmentDomainService } from 'src/app/domain/services';
import { IUseCase } from './interface';

export class DeleteShipmentUseCase implements IUseCase<boolean> {
  constructor(private readonly shipment$: IShipmentDomainService) {}

  execute(shipmentId: string): Observable<boolean> {
    return this.shipment$.deleteShipment(shipmentId).pipe(map(() => true));
  }
}
