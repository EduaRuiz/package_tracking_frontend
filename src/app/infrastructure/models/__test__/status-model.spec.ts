import { StatusModel } from '..';

describe('StatusModel', () => {
  // Arrange
  let status: StatusModel;
  const name = 'Shipped';
  const description = 'The package has been shipped.';
  const _id = '123';

  beforeEach(() => {
    // Act
    status = new StatusModel(name, description, _id);
  });

  // Assert
  it('should create a new instance of StatusModel with all parameters', () => {
    expect(status).toBeInstanceOf(StatusModel);
    expect(status.name).toEqual(name);
    expect(status.description).toEqual(description);
    expect(status._id).toEqual(_id);
  });

  it('should create a new instance of StatusModel without optional parameters', () => {
    // Act
    const newStatus = new StatusModel(name, description);

    // Assert
    expect(newStatus).toBeInstanceOf(StatusModel);
    expect(newStatus.name).toEqual(name);
    expect(newStatus.description).toEqual(description);
    expect(newStatus._id).toBeUndefined();
  });
});
