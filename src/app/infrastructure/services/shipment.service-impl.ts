import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  INewShipmentDomainCommand,
  IShipmentDomainModel,
  IUpdateShipmentDomainCommand,
} from 'src/app/domain';
import { IShipmentDomainService } from 'src/app/domain/services';
import { environment } from 'src/environments/environment';

@Injectable()
export class ShipmentServiceImpl implements IShipmentDomainService {
  private readonly _url: string = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}
  createShipment(
    command: INewShipmentDomainCommand
  ): Observable<IShipmentDomainModel> {
    const body = { ...command };
    return this.http.post<IShipmentDomainModel>(
      `${this._url}/shipment/create`,
      body
    );
  }
  updateShipment(
    command: IUpdateShipmentDomainCommand,
    shipmentId: string
  ): Observable<IShipmentDomainModel> {
    const body = { ...command };
    return this.http.patch<IShipmentDomainModel>(
      `${this._url}/shipment/update/${shipmentId}`,
      body
    );
  }
  deleteShipment(shipmentId: string): Observable<IShipmentDomainModel> {
    return this.http.delete<IShipmentDomainModel>(
      `${this._url}/shipment/delete/${shipmentId}`
    );
  }
  getShipmentsByUser(): Observable<IShipmentDomainModel[]> {
    return this.http.get<IShipmentDomainModel[]>(`${this._url}/shipment/all`);
  }
  getShipment(shipmentId: string): Observable<IShipmentDomainModel> {
    return this.http.get<IShipmentDomainModel>(
      `${this._url}/shipment/${shipmentId}`
    );
  }
}
