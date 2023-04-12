import { IUseCase } from '../use-cases/interface';
import {
  IShipmentDomainService,
  IStatusDomainService,
  IUserDomainService,
} from '../../domain/services';
import { Observable } from 'rxjs';
import {
  // ShipmentUseCases
  DeleteShipmentUseCase,
  GetShipmentUseCase,
  GetShipmentsByUserUseCase,
  RegisterNewShipmentUseCase,
  UpdateShipmentUseCase,
  // StatusUseCases
  GetStatusUseCase,
  // UserUseCases
  DeleteUserUseCase,
  SignInUseCase,
  SignUpUseCase,
  UpdateUserUseCase,
  RefreshTokenUseCase,
} from '../use-cases';

export class PackageTrackingDelegate implements IUseCase<any> {
  private delegate!: IUseCase<any>;

  constructor(
    private readonly user$: IUserDomainService,
    private readonly shipment$: IShipmentDomainService,
    private readonly status$: IStatusDomainService
  ) {}

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toSignIn(): void {
    this.delegate = new SignInUseCase(this.user$);
  }

  toSignUp(): void {
    this.delegate = new SignUpUseCase(this.user$);
  }

  toRegisterNewShipment(): void {
    this.delegate = new RegisterNewShipmentUseCase(this.shipment$);
  }

  toGetShipment(): void {
    this.delegate = new GetShipmentUseCase(this.shipment$);
  }

  toGetShipmentsByUser(): void {
    this.delegate = new GetShipmentsByUserUseCase(this.shipment$);
  }

  toUpdateShipment(): void {
    this.delegate = new UpdateShipmentUseCase(this.shipment$);
  }

  toDeleteShipment(): void {
    this.delegate = new DeleteShipmentUseCase(this.shipment$);
  }

  toGetStatus(): void {
    this.delegate = new GetStatusUseCase(this.status$);
  }

  toUpdateUser(): void {
    this.delegate = new UpdateUserUseCase(this.user$);
  }

  toDeleteUser(): void {
    this.delegate = new DeleteUserUseCase(this.user$);
  }

  toRefreshToken(): void {
    this.delegate = new RefreshTokenUseCase(this.user$);
  }
}
