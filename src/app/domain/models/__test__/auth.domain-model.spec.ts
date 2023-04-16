import { AuthDomainModel } from '..';

describe('AuthDomainModel', () => {
  describe('constructor', () => {
    it('should create an instance of AuthDomainModel with correct data and token', () => {
      // Arrange
      const data = {
        _id: '123',
        email: 'test@example.com',
        name: 'Test User',
      };
      const token = 'exampleToken';

      // Act
      const authDomainModel = new AuthDomainModel(data, token);

      // Assert
      expect(authDomainModel).toBeInstanceOf(AuthDomainModel);
      expect(authDomainModel.data).toEqual(data);
      expect(authDomainModel.token).toBe(token);
    });
  });
});
