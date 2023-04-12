import { Component } from '@angular/core';
import { PackageTrackingDelegate } from './application';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'package_tracking_frontend';

  constructor(private readonly signInUC: PackageTrackingDelegate) {
    this.signInUC.toSignIn();
  }

  ngOnInit() {}

  signIn() {
    const email = 'eduar@Gmail.com';
    const firebaseId = 'aJOaJcGbKuvZvm1lwAZo';
    this.signInUC.execute({ email, firebaseId }).subscribe({
      next: (value) => {
        console.log('AppComponent signIn next', value);
      },
      error: (error) => {
        this.signInUC.toSignUp();
        this.signInUC.execute({ email, firebaseId }).subscribe(
          (value) => {
            console.log('AppComponent signIn next', value);
          },
          (error) => {
            console.log('AppComponent signIn error', error);
          }
        );
        console.log('AppComponent signIn error', error);
      },
      complete: () => {
        console.log('AppComponent signIn complete');
      },
    });
  }

  signOut() {
    this.signInUC.toSignOut();
    this.signInUC.execute().subscribe({
      next: (value) => {
        console.log('AppComponent signOut next', value);
      },
    });
  }
}
