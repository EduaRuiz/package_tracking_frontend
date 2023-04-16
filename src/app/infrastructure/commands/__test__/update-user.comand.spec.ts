import { UpdateUserCommand } from '..';

describe('UpdateUserCommand', () => {
  const document = 12345678;
  const phone = 1234567890;

  it('should create instance with all parameters', () => {
    // Arrange
    const command = new UpdateUserCommand();

    // Act
    command._id = '123';
    command.document = document;
    command.phone = phone;

    // Assert
    expect(command._id).toEqual('123');
    expect(command.document).toEqual(document);
    expect(command.phone).toEqual(phone);
  });

  it('should create instance with only required parameters', () => {
    // Arrange
    const command = new UpdateUserCommand();

    // Assert
    expect(command._id).toBeUndefined();
    expect(command.document).toBeUndefined();
    expect(command.phone).toBeUndefined();
  });
});
