import {
  INewShipmentDomainCommand,
  ISignInDomainCommand,
  ISignUpDomainCommand,
  IUpdateShipmentDomainCommand,
  IUpdateUserDomainCommand,
} from '@domain/commands';
import {
  IAuthDomainModel,
  IShipmentDomainModel,
  IStatusDomainModel,
  IUserDomainModel,
} from '@domain/models';

export const user: IUserDomainModel = {
  _id: 'userId',
  firebaseId: 'firebaseId',
  name: 'name',
  email: 'email',
  document: 'document',
  phone: 'phone',
};

export const status: IStatusDomainModel = {
  _id: 'statusId',
  name: 'CREATED',
  description: 'Shipment created',
};

export const shipment: IShipmentDomainModel = {
  _id: 'shipmentId',
  description: 'description',
  user,
  originAddress: 'originAddress',
  destinationAddress: 'destinationAddress',
  status,
  updatedAt: new Date(),
  createdAt: new Date(),
};

export const authResponse: IAuthDomainModel = {
  data: {
    _id: 'userId',
    name: 'name',
    email: 'email',
  },
  token: 'token',
};

export const newShipmentCommand: INewShipmentDomainCommand = {
  description: 'description',
  originAddress: 'originAddress',
  destinationAddress: 'destinationAddress',
  userId: 'userId',
};

export const signInCommand: ISignInDomainCommand = {
  email: 'email',
  firebaseId: 'firebaseId',
};

export const signUpCommand: ISignUpDomainCommand = {
  name: 'name',
  firebaseId: 'firebaseId',
  email: 'email',
  document: 4,
  phone: 5,
};

export const updateShipmentCommand: IUpdateShipmentDomainCommand = {
  originAddress: 'new origin address',
  destinationAddress: 'new destination address',
  statusId: 'statusId',
};

export const updateUserCommand: IUpdateUserDomainCommand = {
  document: 6,
  phone: 7,
};
