import { IShipmentDomainModel } from 'src/app/domain/models';
import { IUseCase } from './interface';
import { IShipmentDomainService } from 'src/app/domain/services';
import { Observable } from 'rxjs';

export class GetShipmentsByUserUseCase
  implements IUseCase<IShipmentDomainModel[]>
{
  constructor(private readonly shipment$: IShipmentDomainService) {}

  execute(): Observable<IShipmentDomainModel[]> {
    return this.shipment$.getShipmentsByUser();
  }
}
