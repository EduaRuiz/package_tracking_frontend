import { Observable, catchError } from 'rxjs';
import { IUpdateShipmentDomainCommand } from 'src/app/domain/commands';
import { IShipmentDomainModel } from 'src/app/domain/models';
import { IShipmentDomainService } from 'src/app/domain/services';
import { IUseCase } from './interface';

export class UpdateShipmentUseCase
  implements IUseCase<IUpdateShipmentDomainCommand, IShipmentDomainModel>
{
  constructor(private readonly shipment$: IShipmentDomainService) {}

  execute(params: {
    command: IUpdateShipmentDomainCommand;
    _id: string;
  }): Observable<IShipmentDomainModel> {
    return this.shipment$.updateShipment(params.command, params._id).pipe(
      catchError((error: Error) => {
        throw error;
      })
    );
  }
}
