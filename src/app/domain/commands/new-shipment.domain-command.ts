export interface INewShipmentDomainCommand {
  description: string;
  originAddress: string;
  destinationAddress: string;
  userId?: string;
}
