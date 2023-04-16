// Arrange

import { StatusDomainModel } from '..';

describe('StatusDomainModel', () => {
  // Arrange
  let status: StatusDomainModel;
  const name = 'Shipped';
  const description = 'The package has been shipped.';
  const _id = '123';

  beforeEach(() => {
    // Act
    status = new StatusDomainModel(name, description, _id);
  });

  // Assert
  it('should create a new instance of StatusDomainModel with all parameters', () => {
    expect(status).toBeInstanceOf(StatusDomainModel);
    expect(status.name).toEqual(name);
    expect(status.description).toEqual(description);
    expect(status._id).toEqual(_id);
  });

  it('should create a new instance of StatusDomainModel without optional parameters', () => {
    // Act
    const newStatus = new StatusDomainModel(name, description);

    // Assert
    expect(newStatus).toBeInstanceOf(StatusDomainModel);
    expect(newStatus.name).toEqual(name);
    expect(newStatus.description).toEqual(description);
    expect(newStatus._id).toBeUndefined();
  });
});
