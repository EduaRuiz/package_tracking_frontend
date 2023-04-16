import { UserDomainModel } from '..';

describe('UserDomainModel', () => {
  // Arrange
  const email = 'test@test.com';
  const firebaseId = 'abc123';
  const name = 'John Doe';
  const phone = '1234567890';
  const document = 'ABC123';
  const _id = '123';

  describe('with all parameters', () => {
    it('should create a new UserDomainModel instance', () => {
      // Act
      const user = new UserDomainModel(
        email,
        firebaseId,
        name,
        phone,
        document,
        _id
      );

      // Assert
      expect(user.email).toEqual(email);
      expect(user.firebaseId).toEqual(firebaseId);
      expect(user.name).toEqual(name);
      expect(user.phone).toEqual(phone);
      expect(user.document).toEqual(document);
      expect(user._id).toEqual(_id);
    });
  });

  describe('with required parameters only', () => {
    it('should create a new UserDomainModel instance', () => {
      // Act
      const user = new UserDomainModel(
        email,
        firebaseId,
        name,
        phone,
        document
      );

      // Assert
      expect(user.email).toEqual(email);
      expect(user.firebaseId).toEqual(firebaseId);
      expect(user.name).toEqual(name);
      expect(user.phone).toEqual(phone);
      expect(user.document).toEqual(document);
      expect(user._id).toBeUndefined();
    });
  });
});
