import { NgModule } from '@angular/core';
import {
  ShipmentServiceImpl,
  StatusServiceImpl,
  UserServiceImpl,
} from './services';
import {
  IShipmentDomainService,
  IStatusDomainService,
  IUserDomainService,
} from '../domain/services';
import {
  GetStatusUseCase,
  RegisterNewShipmentUseCase,
  SignInUseCase,
} from '../application/use-cases';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PackageTrackingDelegate } from '../application';

// const delegatorFactory = (
//   userService: IUserDomainService,
//   shipmentService: IShipmentDomainService,
//   statusService: IStatusDomainService
// ) => {
//   return new PackageTrackingDelegate(
//     userService,
//     shipmentService,
//     statusService
//   );
// };
// export const delegatorProvider = {
//   provide: PackageTrackingDelegate,
//   useFactory: delegatorFactory,
//   deps: [UserServiceImpl, ShipmentServiceImpl, StatusServiceImpl],
// };

// const signInUseCaseFactory = (userService: IUserDomainService) =>
//   new SignInUseCase(userService);
// export const signInUseCaseProvider = {
//   provide: SignInUseCase,
//   useFactory: signInUseCaseFactory,
//   inject: [IUserDomainService],
// };
export const signInUseCaseProvider = {
  provide: SignInUseCase,
  useFactory: (userService: IUserDomainService) =>
    new SignInUseCase(userService),
  deps: ['IUserDomainService'],
};

// const getStatusFactory = (statusService: IStatusDomainService) =>
//   new GetStatusUseCase(statusService);
// export const getStatusUseCaseProvider = {
//   provide: GetStatusUseCase,
//   useFactory: getStatusFactory,
//   deps: [StatusServiceImpl],
// };

// const registerNewShipmentUseCaseFactory = (
//   shipmentService: IShipmentDomainService
// ) => new RegisterNewShipmentUseCase(shipmentService);
// export const registerNewShipmentUseCaseProvider = {
//   provide: RegisterNewShipmentUseCase,
//   useFactory: registerNewShipmentUseCaseFactory,
//   deps: [ShipmentServiceImpl],
// };

@NgModule({
  providers: [
    { provide: 'IUserDomainService', useClass: UserServiceImpl },
    signInUseCaseProvider,
    // getStatusUseCaseProvider,
    // registerNewShipmentUseCaseProvider,
    // {
    //   provide: [IUserDomainService, IShipmentDomainService, IStatusDomainService],
    //   useClass: [UserServiceImpl, ShipmentServiceImpl, StatusServiceImpl],
    // },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class InfrastructureModule {}
