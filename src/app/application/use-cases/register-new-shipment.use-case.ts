import { INewShipmentDomainCommand } from 'src/app/domain/commands';
import { IUseCase } from './interface';
import { IShipmentDomainService } from 'src/app/domain/services';
import { Observable, catchError } from 'rxjs';
import { ShipmentDomainModel } from '@domain/models';

export class RegisterNewShipmentUseCase
  implements IUseCase<ShipmentDomainModel>
{
  constructor(private readonly shipment$: IShipmentDomainService) {}

  execute(command: INewShipmentDomainCommand): Observable<ShipmentDomainModel> {
    return this.shipment$.createShipment(command).pipe(
      catchError((error: Error) => {
        throw error;
      })
    );
  }
}
