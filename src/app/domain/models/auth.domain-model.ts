import { IAuthDomainModel } from './interfaces';

export class AuthDomainModel implements IAuthDomainModel {
  data: {
    _id: string;
    email: string;
    name: string;
  };
  token: string;

  constructor(
    data: {
      _id: string;
      email: string;
      name: string;
    },
    token: string
  ) {
    this.data = data;
    this.token = token;
  }
}
