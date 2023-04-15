import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SharedGuard } from '..';

describe('SharedGuard', () => {
  let guard: SharedGuard;
  let router: Router;
  let localStorageMock: any;

  beforeEach(() => {
    localStorageMock = {
      getItem: jest.fn(),
      clear: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    TestBed.configureTestingModule({
      providers: [
        SharedGuard,
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    });
    guard = TestBed.inject(SharedGuard);
    router = TestBed.inject(Router);
  });

  it('should redirect to dashboard if access token exists', (done) => {
    // Arrange
    const accessToken = 'some_access_token!';
    localStorageMock.getItem.mockReturnValue(accessToken);
    jest.spyOn(localStorage, 'getItem').mockReturnValue(accessToken);

    // Act
    const canActivateResult$ = guard.canActivate();

    // Assert
    canActivateResult$.subscribe({
      next: (result) => {
        expect(result).toBe(false);
        done();
      },
    });
    expect(router.navigate).toHaveBeenCalledWith(['dashboard']);
  });

  it('should allow access if access token does not exist', (done) => {
    // Arrange
    const accessToken = null;
    localStorageMock.getItem.mockReturnValue(accessToken);
    jest.spyOn(localStorage, 'getItem').mockReturnValue(accessToken);

    // Act
    const canActivateResult$ = guard.canActivate();

    // Assert
    canActivateResult$.subscribe({
      next: (result) => {
        expect(result).toBe(true);
        done();
      },
    });
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
