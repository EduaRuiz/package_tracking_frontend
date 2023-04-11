import { IShipmentDomainModel } from 'src/app/domain/models';
import { IShipmentDomainService } from 'src/app/domain/services';
import { IUseCase } from './interface';
import { Observable, catchError } from 'rxjs';

export class GetShipmentUseCase
  implements IUseCase<string, IShipmentDomainModel>
{
  constructor(private readonly shipment$: IShipmentDomainService) {}

  execute(id: string): Observable<IShipmentDomainModel> {
    return this.shipment$.getShipment(id).pipe(
      catchError((error: Error) => {
        throw error;
      })
    );
  }
}
