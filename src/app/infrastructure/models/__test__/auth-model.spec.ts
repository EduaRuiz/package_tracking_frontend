import { AuthModel } from '..';

describe('AuthModel', () => {
  describe('constructor', () => {
    it('should create an instance of AuthModel with correct data and token', () => {
      // Arrange
      const data = {
        _id: '123',
        email: 'test@example.com',
        name: 'Test User',
      };
      const token = 'exampleToken';

      // Act
      const authDomainModel = new AuthModel(data, token);

      // Assert
      expect(authDomainModel).toBeInstanceOf(AuthModel);
      expect(authDomainModel.data).toEqual(data);
      expect(authDomainModel.token).toBe(token);
    });
  });
});
