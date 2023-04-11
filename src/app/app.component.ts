import { Component } from '@angular/core';
import { signInUseCaseProvider } from './infrastructure/infrastructure.module';
import { SignInUseCase } from './application/use-cases';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'package_tracking_frontend';

  constructor(private readonly userUseCase: SignInUseCase) {}

  ngOnInit() {
    console.log('AppComponent ngOnInit');
  }

  signIn() {
    this.userUseCase.execute({ email: 'test', firebaseId: 'test' }).subscribe({
      next: (value) => {
        console.log('AppComponent signIn next', value);
      },
      error: (error) => {
        console.log('AppComponent signIn error', error);
      },
      complete: () => {
        console.log('AppComponent signIn complete');
      },
    });
  }
}
