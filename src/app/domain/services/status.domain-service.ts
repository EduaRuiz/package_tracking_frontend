import { Observable } from 'rxjs';
import { IStatusDomainModel } from '../models';

export interface IStatusDomainService {
  getAllStatus(): Observable<IStatusDomainModel[]>;
  getStatus(statusId: string): Observable<IStatusDomainModel>;
}
