import { Observable } from 'rxjs';
import {
  INewShipmentDomainCommand,
  IUpdateShipmentDomainCommand,
} from '../commands';
import { ShipmentDomainModel } from '@domain/models';

export interface IShipmentDomainService {
  createShipment(
    command: INewShipmentDomainCommand
  ): Observable<ShipmentDomainModel>;
  updateShipment(
    command: IUpdateShipmentDomainCommand,
    shipmentId: string
  ): Observable<ShipmentDomainModel>;
  deleteShipment(shipmentId: string): Observable<ShipmentDomainModel>;
  getShipmentsByUser(): Observable<ShipmentDomainModel[]>;
  getShipment(shipmentId: string): Observable<ShipmentDomainModel>;
}
