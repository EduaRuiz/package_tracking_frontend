import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageTrackingDelegate } from '@application/delegator';
import { AuthModel } from '@infrastructure/models';
import { DataSignUpService } from '../../services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  resetPass!: string[];
  unauthorized!: boolean;

  constructor(
    private readonly signInUC: PackageTrackingDelegate,
    private readonly router: Router,
    private dataSignUpService: DataSignUpService
  ) {}

  ngOnInit(): void {}

  onGoogle(): void {
    this.signInUC.toSignIn();
    this.signInUC.execute().subscribe({
      next: (value: unknown) => {
        console.log(value);
        this.handlerSuccess(value);
      },
      error: (error) => {
        this.handlerError(error);
      },
    });
  }

  handlerSuccess(data: any): void {
    console.log(data?.data?.firebaseId);
    data?.data?.firebaseId !== undefined &&
      this.dataSignUpService.setData(
        data.data.email,
        data.data.firebaseId,
        data.data.name
      );
    data?.data?.firebaseId !== undefined
      ? this.router.navigate(['index/sign-up'])
      : this.router.navigate(['dashboard']);
  }

  handlerError(err: any): void {
    console.error(err);
    this.unauthorized = true;
  }
}
