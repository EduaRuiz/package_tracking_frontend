import { SignUpCommand } from '..';

describe('SignUpCommand', () => {
  const email = 'test@example.com';
  const firebaseId = '12345';
  const name = 'John Doe';
  const phone = 123456789;
  const document = 1234567890;

  it('should create instance with all parameters', () => {
    // Arrange
    const command = new SignUpCommand();

    // Act
    command.email = email;
    command.firebaseId = firebaseId;
    command.name = name;
    command.phone = phone;
    command.document = document;

    // Assert
    expect(command.email).toEqual(email);
    expect(command.firebaseId).toEqual(firebaseId);
    expect(command.name).toEqual(name);
    expect(command.phone).toEqual(phone);
    expect(command.document).toEqual(document);
  });

  it('should create instance with only required parameters', () => {
    // Arrange
    const command = new SignUpCommand();

    // Assert
    expect(command.email).toBeUndefined();
    expect(command.firebaseId).toBeUndefined();
    expect(command.name).toBeUndefined();
    expect(command.phone).toBeUndefined();
    expect(command.document).toBeUndefined();
  });

  it('should create instance with only required parameters plus name', () => {
    // Arrange
    const command = new SignUpCommand();

    // Act
    command.email = email;
    command.firebaseId = firebaseId;
    command.name = name;

    // Assert
    expect(command.email).toEqual(email);
    expect(command.firebaseId).toEqual(firebaseId);
    expect(command.name).toEqual(name);
    expect(command.phone).toBeUndefined();
    expect(command.document).toBeUndefined();
  });
});
