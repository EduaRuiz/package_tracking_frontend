import { NewShipmentCommand } from '..';

describe('NewShipmentCommand', () => {
  describe('when all parameters are provided', () => {
    it('should create a new instance of NewShipmentCommand', () => {
      // Arrange
      const description = 'Test shipment';
      const originAddress = '123 Main St';
      const destinationAddress = '456 Oak Ave';
      const userId = 'abc123';

      // Act
      const command = new NewShipmentCommand();
      command.description = description;
      command.originAddress = originAddress;
      command.destinationAddress = destinationAddress;
      command.userId = userId;

      // Assert
      expect(command).toBeDefined();
      expect(command.description).toEqual(description);
      expect(command.originAddress).toEqual(originAddress);
      expect(command.destinationAddress).toEqual(destinationAddress);
      expect(command.userId).toEqual(userId);
    });
  });

  describe('when only required parameters are provided', () => {
    it('should create a new instance of NewShipmentCommand', () => {
      // Arrange
      const description = 'Test shipment';
      const originAddress = '123 Main St';
      const destinationAddress = '456 Oak Ave';

      // Act
      const command = new NewShipmentCommand();
      command.description = description;
      command.originAddress = originAddress;
      command.destinationAddress = destinationAddress;

      // Assert
      expect(command).toBeDefined();
      expect(command.description).toEqual(description);
      expect(command.originAddress).toEqual(originAddress);
      expect(command.destinationAddress).toEqual(destinationAddress);
      expect(command.userId).toBeUndefined();
    });
  });
});
