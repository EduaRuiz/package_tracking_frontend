import { NgModule } from '@angular/core';
import {
  ShipmentServiceImpl,
  StatusServiceImpl,
  UserServiceImpl,
} from './services';
// import {
//   IShipmentDomainService,
//   IStatusDomainService,
//   IUserDomainService,
// } from '../domain/services';
// import {
//   GetStatusUseCase,
//   RegisterNewShipmentUseCase,
//   SignInUseCase,
// } from '../application/use-cases';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PackageTrackingDelegate } from '../application';

// export const signInUseCaseProvider = {
//   provide: SignInUseCase,
//   useFactory: (userService: IUserDomainService) =>
//     new SignInUseCase(userService),
//   deps: ['IUserDomainService'],
// };

// export const getStatusUseCaseProvider = {
//   provide: GetStatusUseCase,
//   useFactory: (statusService: IStatusDomainService) =>
//     new GetStatusUseCase(statusService),
//   deps: ['StatusServiceImpl'],
// };

// export const registerNewShipmentUseCaseProvider = {
//   provide: RegisterNewShipmentUseCase,
//   useFactory: (shipmentService: IShipmentDomainService) =>
//     new RegisterNewShipmentUseCase(shipmentService),
//   deps: ['IShipmentDomainService'],
// };

@NgModule({
  providers: [
    {
      provide: PackageTrackingDelegate,
      useClass: PackageTrackingDelegate,
      deps: [
        'IUserDomainService',
        'IShipmentDomainService',
        'IStatusDomainService',
      ],
    },
    // signInUseCaseProvider,
    // getStatusUseCaseProvider,
    // registerNewShipmentUseCaseProvider,
    { provide: 'IShipmentDomainService', useClass: ShipmentServiceImpl },
    { provide: 'IStatusDomainService', useClass: StatusServiceImpl },
    // {
    //   provide: SignInUseCase,
    //   useClass: SignInUseCase,
    //   deps: ['IUserDomainService'],
    // },
    { provide: 'IUserDomainService', useClass: UserServiceImpl },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class InfrastructureModule {}
