import { StatusDomainModel } from '@domain/models';
import { Observable } from 'rxjs';

export interface IStatusDomainService {
  getStatus(statusId: string): Observable<StatusDomainModel>;
}
