import { UpdateShipmentCommand } from '..';

describe('UpdateShipmentCommand', () => {
  describe('UpdateShipmentCommand', () => {
    const id = '12345';
    const originAddress = 'Origin';
    const destinationAddress = 'Destination';
    const statusId = '67890';

    it('should create instance with all parameters', () => {
      // Arrange
      const command = new UpdateShipmentCommand();

      // Act
      command._id = id;
      command.originAddress = originAddress;
      command.destinationAddress = destinationAddress;
      command.statusId = statusId;

      // Assert
      expect(command._id).toEqual(id);
      expect(command.originAddress).toEqual(originAddress);
      expect(command.destinationAddress).toEqual(destinationAddress);
      expect(command.statusId).toEqual(statusId);
    });

    it('should create instance with only optional parameters', () => {
      // Arrange
      const command = new UpdateShipmentCommand();

      // Assert
      expect(command._id).toBeUndefined();
      expect(command.originAddress).toBeUndefined();
      expect(command.destinationAddress).toBeUndefined();
      expect(command.statusId).toBeUndefined();
    });
  });

  describe('UpdateShipmentCommand', () => {
    const originAddress = 'Origin';
    const destinationAddress = 'Destination';

    it('should create instance with all parameters', () => {
      // Arrange
      const command = new UpdateShipmentCommand();

      // Act
      command.originAddress = originAddress;
      command.destinationAddress = destinationAddress;

      // Assert
      expect(command.originAddress).toEqual(originAddress);
      expect(command.destinationAddress).toEqual(destinationAddress);
    });

    it('should create instance with only required parameters', () => {
      // Arrange
      const command = new UpdateShipmentCommand();

      // Assert
      expect(command.originAddress).toBeUndefined();
      expect(command.destinationAddress).toBeUndefined();
    });
  });
});
