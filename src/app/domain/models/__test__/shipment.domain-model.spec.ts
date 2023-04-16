import { ShipmentDomainModel } from '..';
import { user, status } from './mocks';

describe('ShipmentDomainModel', () => {
  describe('constructor', () => {
    it('should create an instance of ShipmentDomainModel with correct values', () => {
      // Arrange
      const description = 'test description';
      const createdAt = new Date();
      const updatedAt = new Date();
      const originAddress = 'test origin address';
      const destinationAddress = 'test destination address';
      const _id = '1234';

      // Act
      const shipment = new ShipmentDomainModel(
        description,
        status,
        createdAt,
        updatedAt,
        user,
        originAddress,
        destinationAddress,
        _id
      );

      // Assert
      expect(shipment).toBeInstanceOf(ShipmentDomainModel);
      expect(shipment.description).toBe(description);
      expect(shipment.status).toBe(status);
      expect(shipment.createdAt).toBe(createdAt);
      expect(shipment.updatedAt).toBe(updatedAt);
      expect(shipment.user).toBe(user);
      expect(shipment.originAddress).toBe(originAddress);
      expect(shipment.destinationAddress).toBe(destinationAddress);
      expect(shipment._id).toBe(_id);
    });

    it('should create an instance without _id', () => {
      // Arrange
      const description = 'test description';
      const createdAt = new Date();
      const updatedAt = new Date();
      const originAddress = 'test origin address';
      const destinationAddress = 'test destination address';

      // Act
      const shipment = new ShipmentDomainModel(
        description,
        status,
        createdAt,
        updatedAt,
        user,
        originAddress,
        destinationAddress
      );

      // Assert
      expect(shipment).toBeInstanceOf(ShipmentDomainModel);
      expect(shipment.description).toBe(description);
      expect(shipment.status).toBe(status);
      expect(shipment.createdAt).toBe(createdAt);
      expect(shipment.updatedAt).toBe(updatedAt);
      expect(shipment.user).toBe(user);
      expect(shipment.originAddress).toBe(originAddress);
      expect(shipment.destinationAddress).toBe(destinationAddress);
      expect(shipment._id).toBeUndefined();
    });
  });
});
