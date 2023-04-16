import { IStatusDomainModel, IUserDomainModel } from '.';

export interface IShipmentDomainModel {
  _id?: string;
  description: string;
  user: IUserDomainModel;
  status: IStatusDomainModel;
  originAddress: string;
  destinationAddress: string;
  updatedAt: Date;
  createdAt: Date;
}
