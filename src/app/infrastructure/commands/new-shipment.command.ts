import { INewShipmentDomainCommand } from '@domain/commands';

export class NewShipmentCommand implements INewShipmentDomainCommand {
  originAddress!: string;
  destinationAddress!: string;
  userId!: string;
}
