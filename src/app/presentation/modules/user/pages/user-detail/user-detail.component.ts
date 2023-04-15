import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackageTrackingDelegate } from '@application/delegator';
import { UpdateUserCommand } from '@infrastructure/commands';
import { UserModel } from '@infrastructure/models';
import { NotificationService } from '@presentation/shared/services';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  user!: UserModel;
  userForm!: FormGroup;
  editing: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userUC: PackageTrackingDelegate,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userUC.toGetUser();
    this.userUC.execute<UserModel>(this.user._id).subscribe({
      next: (user: UserModel) => {
        console.log(user);
        this.user = user;
        this.userForm = this.formBuilder.group({
          name: [{ value: user.name, disabled: true }],
          email: [{ value: user.email, disabled: true }],
          document: [
            { value: user.document, disabled: !this.editing },
            [
              Validators.required,
              Validators.pattern('^[0-9]*$'),
              Validators.minLength(7),
              Validators.maxLength(10),
            ],
          ],
          phone: [
            { value: user.phone, disabled: !this.editing },
            [
              Validators.required,
              Validators.pattern('^[0-9]*$'),
              Validators.minLength(7),
              Validators.maxLength(10),
            ],
          ],
          _id: [{ value: user._id, disabled: true }],
        });
      },
    });
  }

  edit(): void {
    this.editing = true;
    this.userForm.get('document')?.enable();
    this.userForm.get('phone')?.enable();
  }

  save(): void {
    if (this.userForm.valid) {
      this.editing = false;
      this.userForm.get('phone')?.disable();
      this.userForm.get('document')?.disable();
      const editedUser: UpdateUserCommand = {
        _id: this.user._id,
        phone: this.userForm.get('phone')?.value.toString(),
        document: this.userForm.get('document')?.value.toString(),
      };
      if (
        (editedUser.phone &&
          editedUser.phone.toString() !== this.user.phone.toString()) ||
        (editedUser.document &&
          editedUser.document.toString() !== this.user.document.toString())
      ) {
        this.userUC.toUpdateUser();
        this.userUC.execute<UserModel>(editedUser).subscribe({
          next: (user: UserModel) => {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            this.handleSuccess(user);
          },
          error: (error: HttpErrorResponse) => {
            this.handleError(error);
          },
        });
      }
    }
  }

  cancel(): void {
    this.editing = false;
    this.userForm.get('document')?.setValue(this.user.document);
    this.userForm.get('phone')?.setValue(this.user.phone);
    this.userForm.get('document')?.disable();
    this.userForm.get('phone')?.disable();
  }

  isInvalid(controlName: string): boolean {
    const control = this.userForm.get(controlName);
    return !!control?.invalid && (control?.dirty || control?.touched);
  }

  getInvalidClass(controlName: string): string {
    return this.isInvalid(controlName) ? 'is-invalid' : '';
  }

  handleError(error: HttpErrorResponse): void {
    this.notificationService.showMessage(
      'Error',
      error.error.message[0],
      'error'
    );
  }

  handleSuccess(user: UserModel): void {
    this.notificationService.showMessage(
      'Success',
      `User updated!, ${user.name}`,
      'success'
    );
  }
}
