import { INewShipmentDomainCommand } from '@domain/commands';

export class NewShipmentCommand implements INewShipmentDomainCommand {
  description!: string;
  originAddress!: string;
  destinationAddress!: string;
  userId?: string;
}
