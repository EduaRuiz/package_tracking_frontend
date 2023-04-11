import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStatusDomainModel } from 'src/app/domain';
import { IStatusDomainService } from 'src/app/domain/services';
import { environment } from 'src/environments/environment';

@Injectable()
export class StatusServiceImpl implements IStatusDomainService {
  private readonly _url: string = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getStatus(statusId: string): Observable<IStatusDomainModel> {
    return this.http.get<IStatusDomainModel>(`${this._url}/status/${statusId}`);
  }
}
