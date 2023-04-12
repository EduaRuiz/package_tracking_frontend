import { IUpdateUserDomainCommand } from '@domain/commands';

export class UpdateUserCommand implements IUpdateUserDomainCommand {
  _id?: string;
  document?: number;
  phone?: number;
}
