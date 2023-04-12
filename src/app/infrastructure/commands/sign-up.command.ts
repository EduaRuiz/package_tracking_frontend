import { ISignUpDomainCommand } from '@domain/commands';

export class SignUpCommand implements ISignUpDomainCommand {
  email!: string;
  firebaseId!: string;
  name!: string;
  phone!: number;
  document!: number;
}
