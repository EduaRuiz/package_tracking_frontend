import { StatusDomainModel } from '.';
import { IShipmentDomainModel, IUserDomainModel } from './interfaces';

export class ShipmentDomainModel implements IShipmentDomainModel {
  _id?: string;
  name: string;
  description: string;
  status: StatusDomainModel;
  createdAt: Date;
  updatedAt: Date;
  user: IUserDomainModel;
  originAddress: 'string';
  destinationAddress: 'string';

  constructor(
    name: string,
    description: string,
    status: StatusDomainModel,
    createdAt: Date,
    updatedAt: Date,
    user: IUserDomainModel,
    originAddress: 'string',
    destinationAddress: 'string',
    _id?: string
  ) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
    this.originAddress = originAddress;
    this.destinationAddress = destinationAddress;
  }
}
