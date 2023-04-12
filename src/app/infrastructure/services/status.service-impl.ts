import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStatusDomainService } from '@domain/services';
import { StatusModel } from '@infrastructure/models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class StatusServiceImpl implements IStatusDomainService {
  private readonly _url: string = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getStatus(statusId: string): Observable<StatusModel> {
    return this.http.get<StatusModel>(`${this._url}/status/${statusId}`);
  }
}
