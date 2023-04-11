import { Observable } from 'rxjs';
import {
  INewShipmentDomainCommand,
  IUpdateShipmentDomainCommand,
} from '../commands';
import { IShipmentDomainModel } from '../models';

export interface IShipmentDomainService {
  createShipment(
    command: INewShipmentDomainCommand
  ): Observable<IShipmentDomainModel>;
  updateShipment(
    command: IUpdateShipmentDomainCommand,
    shipmentId: string
  ): Observable<IShipmentDomainModel>;
  deleteShipment(shipmentId: string): Observable<IShipmentDomainModel>;
  getShipmentsByUser(): Observable<IShipmentDomainModel[]>;
  getShipment(shipmentId: string): Observable<IShipmentDomainModel>;
}
