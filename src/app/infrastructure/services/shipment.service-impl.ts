import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IShipmentDomainService } from '@domain/services';
import {
  NewShipmentCommand,
  UpdateShipmentCommand,
} from '@infrastructure/commands';
import { ShipmentModel } from '@infrastructure/models';
import { Observable } from 'rxjs';

@Injectable()
export class ShipmentServiceImpl implements IShipmentDomainService {
  private readonly _url: string = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}
  createShipment(command: NewShipmentCommand): Observable<ShipmentModel> {
    const body = { ...command };
    return this.http.post<ShipmentModel>(`${this._url}/shipment/create`, body);
  }
  updateShipment(
    command: UpdateShipmentCommand,
    shipmentId: string
  ): Observable<ShipmentModel> {
    const body = { ...command };
    return this.http.patch<ShipmentModel>(
      `${this._url}/shipment/update/${shipmentId}`,
      body
    );
  }
  deleteShipment(shipmentId: string): Observable<ShipmentModel> {
    return this.http.delete<ShipmentModel>(
      `${this._url}/shipment/delete/${shipmentId}`
    );
  }
  getShipmentsByUser(): Observable<ShipmentModel[]> {
    return this.http.get<ShipmentModel[]>(`${this._url}/shipment/all`);
  }
  getShipment(shipmentId: string): Observable<ShipmentModel> {
    return this.http.get<ShipmentModel>(`${this._url}/shipment/${shipmentId}`);
  }
}
