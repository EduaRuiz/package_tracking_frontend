import { IsoDatePipe } from './iso-date.pipe';

describe('IsoDatePipe', () => {
  let pipe: IsoDatePipe;

  beforeEach(() => {
    pipe = new IsoDatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should transform an ISO date to the "medium" format', () => {
      // Arrange
      const input = '2022-04-15T12:00:00Z';
      const expectedOutput = 'Apr 15, 2022, 7:00:00 AM';

      // Act
      const output = pipe.transform(input);

      // Assert
      expect(output).toEqual(expectedOutput);
    });

    it('should return an empty string if the input is not a valid date string', () => {
      // Arrange
      const input = 'invalid date string';

      // Act
      const output = pipe.transform(input);

      // Assert
      expect(output).toEqual('');
    });
  });
});
