import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageTrackingDelegate } from '@application/delegator';
import { AuthModel } from '@infrastructure/models';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  homePath!: string[];
  signOutPath!: string[];
  newShipmentPath!: string[];
  currentUser!: AuthModel;

  constructor(
    private readonly signOutUC: PackageTrackingDelegate,
    private readonly router: Router,
    private readonly notificationService: NotificationService
  ) {
    this.homePath = ['dashboard'];
    this.signOutPath = ['../index'];
    this.newShipmentPath = ['../dashboard/register'];
    this.currentUser = JSON.parse(
      localStorage.getItem('user') ?? JSON.stringify('')
    );
  }

  ngOnInit(): void {}

  signOut(): void {
    this.signOutUC.toSignOut();
    this.signOutUC.execute().subscribe({
      next: () => {
        this.notificationService.showMessage(
          'Success',
          'You have been signed out',
          'success'
        );
        this.router.navigate(this.signOutPath);
      },
    });
  }
}
