import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageTrackingDelegate } from '@application/delegator';
import { AuthModel } from '@infrastructure/models';
import { DataSignUpService } from '../../services';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '@presentation/shared/services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  user!: AuthModel;

  constructor(
    private readonly signInUC: PackageTrackingDelegate,
    private readonly router: Router,
    private readonly dataSignUpService: DataSignUpService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  onGoogle(): void {
    this.signInUC.toSignIn();
    this.signInUC.execute<AuthModel>().subscribe({
      next: (response: AuthModel) => {
        this.handlerSuccess(response as AuthModel);
      },
      error: (error: HttpErrorResponse) => {
        this.handlerError(error);
      },
    });
  }

  handlerSuccess(response: AuthModel): void {
    response?.data?.firebaseId !== undefined &&
      this.dataSignUpService.setData(
        response.data.email,
        response.data.firebaseId,
        response.data.name
      );
    response.data.firebaseId === undefined &&
      localStorage.setItem('user', JSON.stringify(response.data));
    response.data.firebaseId === undefined &&
      this.notificationService.showMessage(
        'Success',
        `Welcome ${response.data.name}`,
        'success'
      );
    response.data.firebaseId !== undefined
      ? this.router.navigate(['index/sign-up'])
      : this.router.navigate(['dashboard']);
  }

  handlerError(err: HttpErrorResponse): void {
    err.error.message !== 'User not found' &&
      this.notificationService.showMessage('Error', err.error.message, 'error');
  }
}
