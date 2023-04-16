import { SignInCommand } from '..';

describe('SignInCommand', () => {
  const email = 'test@example.com';
  const firebaseId = '12345';

  it('should create instance with all parameters', () => {
    // Arrange
    const command = new SignInCommand();

    // Act
    command.email = email;
    command.firebaseId = firebaseId;

    // Assert
    expect(command.email).toEqual(email);
    expect(command.firebaseId).toEqual(firebaseId);
  });

  it('should create instance with only required parameters', () => {
    // Arrange
    const command = new SignInCommand();

    // Assert
    expect(command.email).toBeUndefined();
    expect(command.firebaseId).toBeUndefined();
  });
});
