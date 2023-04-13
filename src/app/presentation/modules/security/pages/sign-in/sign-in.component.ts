import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageTrackingDelegate } from '@application/delegator';
import { AuthModel } from '@infrastructure/models';
import { DataSignUpService } from '../../services';
import { first, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  resetPass!: string[];
  unauthorized!: boolean;
  user!: AuthModel;

  constructor(
    private readonly signInUC: PackageTrackingDelegate,
    private readonly router: Router,
    private dataSignUpService: DataSignUpService
  ) {}

  ngOnInit(): void {}

  onGoogle(): void {
    this.signInUC.toSignIn();
    this.signInUC.execute().subscribe({
      next: (response: unknown) => {
        this.handlerSuccess(response as AuthModel);
      },
      error: (error) => {
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
    response.data.firebaseId !== undefined
      ? this.router.navigate(['index/sign-up'])
      : this.router.navigate(['dashboard']);
  }

  handlerError(err: any): void {
    console.error(err);
    this.unauthorized = true;
  }
}
