import { of, throwError } from 'rxjs';
import { GetStatusUseCase } from '..';
import { IStatusDomainService } from '@domain/services';
import { status } from './mocks';

describe('GetStatusUseCase', () => {
  let useCase: GetStatusUseCase;
  let statusServiceMock: IStatusDomainService;

  beforeEach(() => {
    statusServiceMock = {
      getStatus: jest.fn(),
    } as unknown as IStatusDomainService;
    useCase = new GetStatusUseCase(statusServiceMock);
  });

  it('should be defined', () => {
    // Assert
    expect(useCase).toBeDefined();
  });

  it('should return a status when it is retrieved successfully', (done) => {
    // Arrange
    const statusId = 'status123';
    jest.spyOn(statusServiceMock, 'getStatus').mockReturnValue(of(status));

    // Act
    const result$ = useCase.execute(statusId);

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toEqual(status);
        expect(statusServiceMock.getStatus).toHaveBeenCalledWith(statusId);
        done();
      },
    });
  });

  it('should return an error when status retrieval fails', (done) => {
    // Arrange
    const statusId = 'status123';
    const errorMessage = 'Failed to retrieve status';
    jest
      .spyOn(statusServiceMock, 'getStatus')
      .mockReturnValue(throwError(() => new Error(errorMessage)));

    // Act
    const result$ = useCase.execute(statusId);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toEqual(new Error(errorMessage));
        expect(error.message).toEqual(errorMessage);
        expect(statusServiceMock.getStatus).toHaveBeenCalledWith(statusId);
        done();
      },
    });
  });
});
