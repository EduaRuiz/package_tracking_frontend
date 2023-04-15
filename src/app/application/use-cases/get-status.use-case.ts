import { IStatusDomainModel } from 'src/app/domain/models';
import { IUseCase } from './interface';
import { Observable, catchError } from 'rxjs';
import { IStatusDomainService } from 'src/app/domain/services';

export class GetStatusUseCase implements IUseCase<IStatusDomainModel> {
  constructor(private readonly status$: IStatusDomainService) {}

  execute(statusId: string): Observable<IStatusDomainModel> {
    return this.status$.getStatus(statusId);
  }
}
