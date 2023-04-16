import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import Swal from 'sweetalert2';

describe('NotificationService', () => {
  let service: NotificationService;
  let spySwalFire: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService],
    });
    service = TestBed.inject(NotificationService);
    spySwalFire = jest.spyOn(Swal, 'fire');
  });

  afterEach(() => {
    spySwalFire.mockClear();
  });

  it('should be created', () => {
    // Assert
    expect(service).toBeTruthy();
  });

  it('should call Swal.fire with the correct arguments for success message', () => {
    // Arrange
    const title = 'Test Title';
    const message = 'Test Message';

    // Act
    service.showMessage(title, message, 'success');

    // Assert
    expect(spySwalFire).toHaveBeenCalledWith(title, message, 'success');
  });

  it('should call Swal.fire with the correct arguments for error message', () => {
    // Arrange
    const title = 'Test Title';
    const message = 'Test Message';

    // Act
    service.showMessage(title, message, 'error');

    // Assert
    expect(spySwalFire).toHaveBeenCalledWith(title, message, 'error');
  });

  it('should call Swal.fire with the correct arguments for warning message', () => {
    // Arrange
    const title = 'Test Title';
    const message = 'Test Message';

    // Act
    service.showMessage(title, message, 'warning');

    // Assert
    expect(spySwalFire).toHaveBeenCalledWith(title, message, 'warning');
  });

  it('should call Swal.fire with the correct arguments for info message', () => {
    // Arrange
    const title = 'Test Title';
    const message = 'Test Message';

    // Act
    service.showMessage(title, message, 'info');

    // Assert
    expect(spySwalFire).toHaveBeenCalledWith(title, message, 'info');
  });
});
