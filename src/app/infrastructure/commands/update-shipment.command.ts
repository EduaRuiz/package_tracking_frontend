import { IUpdateShipmentDomainCommand } from '@domain/commands';

export class UpdateShipmentCommand implements IUpdateShipmentDomainCommand {
  _id?: string;
  originAddress?: string;
  destinationAddress?: string;
  statusId?: string;
}
