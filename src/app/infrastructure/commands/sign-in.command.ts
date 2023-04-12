import { ISignInDomainCommand } from '@domain/commands';

export class SignInCommand implements ISignInDomainCommand {
  email!: string;
  firebaseId!: string;
}
