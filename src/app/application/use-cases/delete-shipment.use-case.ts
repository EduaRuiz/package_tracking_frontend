import { Observable, catchError, map } from 'rxjs';
import { IShipmentDomainService } from 'src/app/domain/services';
import { IUseCase } from './interface';

export class DeleteShipmentUseCase implements IUseCase<string, boolean> {
  constructor(private readonly shipment$: IShipmentDomainService) {}

  execute(id: string): Observable<boolean> {
    return this.shipment$.deleteShipment(id).pipe(
      map(() => true),
      catchError((error: Error) => {
        throw error;
      })
    );
  }
}
