import { INewShipmentDomainCommand } from 'src/app/domain/commands';
import { IShipmentDomainModel } from 'src/app/domain/models';
import { IUseCase } from './interface';
import { IShipmentDomainService } from 'src/app/domain/services';
import { Observable, catchError } from 'rxjs';

export class RegisterNewShipmentUseCase
  implements IUseCase<INewShipmentDomainCommand, IShipmentDomainModel>
{
  constructor(private readonly shipment$: IShipmentDomainService) {}

  execute(params: INewShipmentDomainCommand): Observable<IShipmentDomainModel> {
    return this.shipment$.createShipment(params).pipe(
      catchError((error: Error) => {
        throw error;
      })
    );
  }
}
