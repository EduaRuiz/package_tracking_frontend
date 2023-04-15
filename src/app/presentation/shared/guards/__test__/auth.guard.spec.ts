import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { PackageTrackingDelegate } from '@application/delegator';
import { of } from 'rxjs';
import { AuthGuard } from '..';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let delegate: PackageTrackingDelegate;
  let router: any;

  beforeEach(() => {
    router = {
      navigate: jest.fn(),
    };

    delegate = {
      execute: jest.fn(),
      toRefreshToken: jest.fn(),
    } as unknown as PackageTrackingDelegate;

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: PackageTrackingDelegate, useValue: delegate },
        { provide: Router, useValue: router },
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should canActivate return true', () => {
    jest.spyOn(delegate, 'execute').mockReturnValue(of(true));

    guard.canActivate().subscribe((result) => {
      expect(result).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  it('should canActivate return false and navigate to index', () => {
    jest.spyOn(delegate, 'execute').mockReturnValue(of(false));

    guard.canActivate().subscribe(() => {
      expect(router.navigate).toHaveBeenCalledWith(['index']);
    });
  });
});
