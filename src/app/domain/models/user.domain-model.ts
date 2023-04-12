import { IUserDomainModel } from './interfaces';

export class UserDomainModel implements IUserDomainModel {
  _id?: string | undefined;
  email: string;
  firebaseId: string;
  name: string;
  phone: string;
  document: string;

  constructor(
    email: string,
    firebaseId: string,
    name: string,
    phone: string,
    document: string,
    _id?: string
  ) {
    this.email = email;
    this.firebaseId = firebaseId;
    this.name = name;
    this.phone = phone;
    this.document = document;
    this._id = _id;
  }
}
