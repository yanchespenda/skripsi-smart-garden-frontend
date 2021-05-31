import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogConfirmComponent } from '@component/dialog-confirm/dialog-confirm.component';
import { DialogMcuTokenComponent } from '@component/dialog-mcu-token/dialog-mcu-token.component';
import { finalize } from 'rxjs/operators';
import { OauthService } from 'src/app/services/oauth.service';

export const matchValues = (matchTo: string): (AbstractControl) => ValidationErrors | null => {
  return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
          !!control.parent.value &&
          control.value === control.parent.controls[matchTo].value
          ? null
          : { isMatching: true };
  };
};

@Component({
  selector: 'app-dialog-change-password',
  templateUrl: './dialog-change-password.component.html',
  styleUrls: ['./dialog-change-password.component.scss']
})
export class DialogChangePasswordComponent implements OnInit {

  showPassword = false;
  isLoading = false;

  dialogForm: FormGroup = this.formBuilder.group({
    currentPassword: [
      '', [Validators.required]
    ],
    newPassword: [
      '', [Validators.required]
    ],
    confirmPassword: [
      '', [Validators.required, matchValues('newPassword')]
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog,
    public dialogRef: MatDialogRef<DialogMcuTokenComponent>,
    private oauthService: OauthService,
  ) { }

  getErrorMessage(control: string): string {
    if (this.valForm[control].hasError('required')) {
      return `Field required`;
    } else if (this.valForm[control].hasError('isMatching')) {
      return `Confirm password does not match`;
    }
    return ``;
  }

  get valForm(): FormGroup['controls'] {
    return this.dialogForm.controls;
  }

  onConfirm(): void {
    if (this.dialogForm.invalid) {
      this.matSnackBar.open('Some field not valid, please check again', 'close', {
        duration: 3000
      });
      return;
    }
    if (this.isLoading) {
      return;
    }

    const dialogRef = this.matDialog.open(DialogConfirmComponent, {
      data: {
        title: 'Confirm',
        content: 'Are you sure want to change your password?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.runChange();
      }
    });
  }

  runChange(): void {
    this.isLoading = true;
    this.oauthService.changePassword({
      passwordNew: this.valForm.newPassword.value,
      passwordConfirm: this.valForm.confirmPassword.value,
      password: this.valForm.currentPassword.value,
    })
    .pipe(finalize(() => this.isLoading = false))
    .subscribe(res => {
      this.dialogRef.close(true);
      this.matSnackBar.open(res.message, 'close', {
        duration: 3000
      });
    }, err => {
      console.log('err', err);
      this.matSnackBar.open(err?.error?.message || err?.message, 'close', {
        duration: 3000
      });
    });
  }

  ngOnInit(): void {
  }

}
