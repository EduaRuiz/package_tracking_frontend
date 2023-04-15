import {
  IAuthDomainService,
  IShipmentDomainService,
  IStatusDomainService,
  IUserDomainService,
} from '@domain/services';
import { PackageTrackingDelegate } from '..';
import { of } from 'rxjs';
import {
  DeleteShipmentUseCase,
  DeleteUserUseCase,
  GetShipmentUseCase,
  GetShipmentsByUserUseCase,
  GetStatusUseCase,
  GetUserUseCase,
  RefreshTokenUseCase,
  RegisterNewShipmentUseCase,
  SignInUseCase,
  SignOutUseCase,
  SignUpUseCase,
  UpdateShipmentUseCase,
  UpdateUserUseCase,
} from '@use-cases/index';

let packageTrackingDelegate: PackageTrackingDelegate;
let userDomainService: IUserDomainService;
let shipmentDomainService: IShipmentDomainService;
let authDomainService: IAuthDomainService;
let statusDomainService: IStatusDomainService;

describe('PackageTrackingDelegate', () => {
  beforeEach(() => {
    // Arrange
    userDomainService = {
      signIn: jest.fn(),
      signUp: jest.fn(),
      getUser: jest.fn(),
      refreshToken: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    shipmentDomainService = {
      createShipment: jest.fn(),
      getShipment: jest.fn(),
      getShipmentsByUser: jest.fn(),
      updateShipment: jest.fn(),
      deleteShipment: jest.fn(),
    };
    statusDomainService = {
      getStatus: jest.fn(),
    };
    authDomainService = {
      getUserCredentials: jest.fn(),
      signOut: jest.fn(),
    };

    // Act
    packageTrackingDelegate = new PackageTrackingDelegate(
      userDomainService,
      shipmentDomainService,
      statusDomainService,
      authDomainService
    );
  });

  it('should be defined', () => {
    // Assert
    expect(packageTrackingDelegate).toBeDefined();
  });

  it('should get shipments by user successfully', (done) => {
    // Arrange
    packageTrackingDelegate.toGetShipmentsByUser();
    const userId = '123';
    jest
      .spyOn(shipmentDomainService, 'getShipmentsByUser')
      .mockReturnValue(
        of([{ _id: '1234', status: 'Delivered', user: { _id: '123' } } as any])
      );
    jest
      .spyOn(userDomainService, 'getUser')
      .mockReturnValue(of({ _id: userId } as any));

    // Act
    const result$ =
      packageTrackingDelegate.execute<{ id: string; status: string }[]>(userId);

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toEqual([
          { _id: '1234', status: 'Delivered', user: { _id: '123' } },
        ]);
        expect(shipmentDomainService.getShipmentsByUser).toHaveBeenCalledWith();
        done();
      },
    });
  });

  describe('when calling toSignIn', () => {
    it('should instantiate SignInUseCase', () => {
      // Act
      packageTrackingDelegate.toSignIn();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(SignInUseCase);
    });
  });

  describe('when calling toSignUp', () => {
    it('should instantiate SignUpUseCase', () => {
      // Act
      packageTrackingDelegate.toSignUp();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(SignUpUseCase);
    });
  });

  describe('when calling toRegisterNewShipment', () => {
    it('should instantiate RegisterNewShipmentUseCase', () => {
      // Act
      packageTrackingDelegate.toRegisterNewShipment();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        RegisterNewShipmentUseCase
      );
    });
  });

  describe('when calling toGetShipment', () => {
    it('should instantiate GetShipmentUseCase', () => {
      // Act
      packageTrackingDelegate.toGetShipment();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        GetShipmentUseCase
      );
    });
  });

  describe('when calling toGetShipmentsByUser', () => {
    it('should instantiate GetShipmentsByUserUseCase', () => {
      // Act
      packageTrackingDelegate.toGetShipmentsByUser();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        GetShipmentsByUserUseCase
      );
    });
  });

  describe('when calling toUpdateShipment', () => {
    it('should instantiate UpdateShipmentUseCase', () => {
      // Act
      packageTrackingDelegate.toUpdateShipment();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        UpdateShipmentUseCase
      );
    });
  });

  describe('when calling toDeleteShipment', () => {
    it('should instantiate DeleteShipmentUseCase', () => {
      // Act
      packageTrackingDelegate.toDeleteShipment();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        DeleteShipmentUseCase
      );
    });
  });

  describe('when calling toGetUser', () => {
    it('should instantiate GetUserUseCase', () => {
      // Act
      packageTrackingDelegate.toGetUser();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        GetUserUseCase
      );
    });
  });

  describe('when calling toGetStatus', () => {
    it('should instantiate GetStatusUseCase', () => {
      // Act
      packageTrackingDelegate.toGetStatus();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        GetStatusUseCase
      );
    });
  });

  describe('when calling toUpdateUser', () => {
    it('should instantiate UpdateUserUseCase', () => {
      // Act
      packageTrackingDelegate.toUpdateUser();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        UpdateUserUseCase
      );
    });
  });

  describe('when calling toDeleteUser', () => {
    it('should instantiate DeleteUserUseCase', () => {
      // Act
      packageTrackingDelegate.toDeleteUser();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        DeleteUserUseCase
      );
    });
  });

  describe('when calling toGetStatus', () => {
    it('should instantiate getStatusUseCase', () => {
      // Act
      packageTrackingDelegate.toGetStatus();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        GetStatusUseCase
      );
    });
  });

  describe('when calling toRefreshToken', () => {
    it('should instantiate RefreshTokenUseCase', () => {
      // Act
      packageTrackingDelegate.toRefreshToken();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        RefreshTokenUseCase
      );
    });
  });

  describe('when calling toSignOut', () => {
    it('should instantiate SignOutUseCase', () => {
      // Act
      packageTrackingDelegate.toSignOut();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        SignOutUseCase
      );
    });
  });
});
