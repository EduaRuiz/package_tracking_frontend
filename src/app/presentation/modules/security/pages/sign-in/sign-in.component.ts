import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageTrackingDelegate } from '@application/delegator';
import { AuthModel } from '@infrastructure/models';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  resetPass!: string[];
  signUp!: string[];
  unauthorized!: boolean;

  constructor(
    private readonly signInUC: PackageTrackingDelegate,
    private readonly router: Router
  ) {
    this.signUp = ['../sign-up'];
  }

  ngOnInit(): void {
    this.random_bg_color();
  }

  onGoogle(): void {
    this.signInUC.toSignIn();
    this.signInUC.execute().subscribe({
      next: (value) => {
        this.handlerSuccess(value);
      },
      error: (error) => {
        this.handlerError(error);
      },
    });
  }

  handlerSuccess(data: any): void {
    !data?.firebaseId
      ? this.router.navigate(['index/sign-up'])
      : this.router.navigate(['dashboard']);
  }

  handlerError(err: any): void {
    console.error(err);
    this.unauthorized = true;
  }

  private random_bg_color() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var bgColor = 'rgb(' + r + ',' + g + ',' + b + ')';
    document.body.style.background = bgColor;
  }
}
