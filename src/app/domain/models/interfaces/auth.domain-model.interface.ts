import { IDataAuthDomain } from '@domain/interfaces';

export interface IAuthDomainModel {
  data: IDataAuthDomain;
  token: string;
}
