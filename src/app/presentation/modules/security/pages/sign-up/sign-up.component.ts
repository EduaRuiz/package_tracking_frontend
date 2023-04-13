import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PackageTrackingDelegate } from '@application/delegator';
import { UserModel } from '@infrastructure/models';
import { environment } from 'src/environments/environment';
import { DataSignUpService } from '../../services';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signIn!: string[];
  signUp!: string[];
  checkoutForm!: FormGroup;
  private email: string = '';
  private name!: string;
  private firebaseId!: string;

  constructor(
    private readonly signUpUC: PackageTrackingDelegate,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private dataSignUpService: DataSignUpService
  ) {
    signUpUC.toSignUp();
    this.signIn = ['../sign-in'];
    this.signUp = ['../sign-up'];
    this.checkoutForm = this.formBuilder.group({
      email: [this.email, [Validators.required]],
      name: [
        this.name,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
          Validators.pattern(new RegExp('^[0-9]+$')),
        ],
      ],
      document: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
          Validators.pattern(new RegExp('^[0-9]+$')),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.dataSignUpService.getData().subscribe((data) => {
      this.email = data.email;
      this.name = data.name;
      this.firebaseId = data.firebaseId;
      this.checkoutForm.get('email')?.setValue(this.email);
      this.checkoutForm.get('name')?.setValue(this.name);
      this.email === '' && this.router.navigate(['index/sign-in']);
    });
  }

  onSubmit(): void {
    const user = <UserModel>this.checkoutForm.value;
    console.log(user);
    user.firebaseId = this.firebaseId;
    user.email = this.email;
    user.name = this.name;
    this.checkoutForm.markAllAsTouched();
    if (this.checkoutForm.valid) {
      this.signUpUC.execute(user).subscribe({
        next: (data) => this.handlerSuccess(data),
        error: (err) => this.handlerError(err),
      });
    }
  }

  handlerSuccess(data: any): void {
    this.router.navigate(['dashboard']);
  }

  handlerError(err: any): void {
    console.error(err);
    // Swal.fire({
    //   icon: 'error',
    //   title: 'Oops...',
    //   text: err?.error?.message,
    // });
  }

  clear() {
    this.checkoutForm.reset();
    this.checkoutForm.get('email')?.setValue(this.email);
    this.checkoutForm.get('name')?.setValue(this.name);
  }

  handlerValidators(param: 'email' | 'name' | 'phone' | 'document'): string {
    return this.checkoutForm.controls[param].errors &&
      this.checkoutForm.controls[param].touched
      ? 'is-invalid'
      : '';
  }

  handlerMessage(param: 'email' | 'name' | 'phone' | 'document'): string {
    const messages = {
      pattern: `Please provide a valid ${param}`,
      required: `Enter ${param} here`,
      minlength: ` chars minimum`,
      maxlength: ` chars maximum`,
    };
    let message = '';
    const errorValue = Object.values(
      this.checkoutForm.controls[param].errors ?? {}
    )[0];
    const errorKey = Object.keys(
      this.checkoutForm.controls[param].errors ?? {}
    )[0];
    switch (errorKey) {
      case 'required':
        message = messages.required;
        break;
      case 'pattern':
        message = messages.pattern;
        break;
      case 'minlength':
        message = errorValue?.requiredLength + messages.minlength;
        break;
      case 'maxlength':
        message = errorValue?.requiredLength + messages.maxlength;
        break;
    }
    return message;
  }
}
