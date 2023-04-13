import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PackageTrackingDelegate } from '@application/delegator';
import { UserModel } from '@infrastructure/models';
import { environment } from 'src/environments/environment';
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

  constructor(
    private readonly signUpUC: PackageTrackingDelegate,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    signUpUC.toSignUp();
    this.signIn = ['../signin'];
    this.signUp = ['../signup'];
    this.checkoutForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(new RegExp(environment.regexEmail)),
        ],
      ],
      name: [
        '',
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
      avatarUrl: ['', []],
    });
  }

  ngOnInit(): void {
    this.random_bg_color();
  }

  onSubmit(): void {
    const user = <UserModel>this.checkoutForm.value;
    this.checkoutForm.markAllAsTouched();
    if (this.checkoutForm.valid) {
      this.signUpUC.execute(user).subscribe({
        next: (data) => this.handlerSuccess(data),
        error: (err) => this.handlerError(err),
        complete: () => console.log('complete'),
      });
    }
  }

  handlerSuccess(data: any): void {}

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
    this.checkoutForm.get('documentTypeId')?.setValue('CC');
  }

  handlerValidators(param: 'email' | 'name' | 'phone' | 'document'): string {
    return this.checkoutForm.controls[param].errors &&
      this.checkoutForm.controls[param].touched
      ? 'is-invalid'
      : '';
  }

  handlerMessage(
    param: 'email' | 'name' | 'phone' | 'document' | 'avatarUrl'
  ): string {
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
        message = messages.pattern; //+param==='email'?'. The password must be at least 8 characters and contain at least 1 lowercase, 1 uppercase, and 1 number.':''
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

  private random_bg_color() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var bgColor = 'rgb(' + r + ',' + g + ',' + b + ')';
    document.body.style.background = bgColor;
  }
}
