import { INewShipmentDomainCommand } from 'src/app/domain/commands';
import { IShipmentDomainModel } from 'src/app/domain/models';
import { IUseCase } from './interface';
import { IShipmentDomainService } from 'src/app/domain/services';
import { Observable, catchError } from 'rxjs';

export class RegisterNewShipmentUseCase
  implements IUseCase<IShipmentDomainModel>
{
  constructor(private readonly shipment$: IShipmentDomainService) {}

  execute(
    command: INewShipmentDomainCommand
  ): Observable<IShipmentDomainModel> {
    return this.shipment$.createShipment(command).pipe(
      catchError((error: Error) => {
        throw error;
      })
    );
  }
}
