import { NgModule } from '@angular/core';
import {
  ShipmentServiceImpl,
  StatusServiceImpl,
  UserServiceImpl,
} from './services';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PackageTrackingDelegate } from '../application';
import { AuthServiceImpl } from './utils';

@NgModule({
  providers: [
    {
      provide: PackageTrackingDelegate,
      useClass: PackageTrackingDelegate,
      deps: [
        'IUserDomainService',
        'IShipmentDomainService',
        'IStatusDomainService',
        'IAuthDomainService',
      ],
    },
    { provide: 'IShipmentDomainService', useClass: ShipmentServiceImpl },
    { provide: 'IStatusDomainService', useClass: StatusServiceImpl },
    { provide: 'IUserDomainService', useClass: UserServiceImpl },
    { provide: 'IAuthDomainService', useClass: AuthServiceImpl },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class InfrastructureModule {}
