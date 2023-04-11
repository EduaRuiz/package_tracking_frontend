import { Observable } from 'rxjs';
import { IStatusDomainModel } from '../models';

export interface IStatusDomainService {
  getStatus(statusId: string): Observable<IStatusDomainModel>;
}
