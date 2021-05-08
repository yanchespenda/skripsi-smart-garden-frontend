import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogConfirmComponent } from '@component/dialog-confirm/dialog-confirm.component';
import { DialogMcuTokenComponent } from '@component/dialog-mcu-token/dialog-mcu-token.component';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-dialog-change-password',
  templateUrl: './dialog-change-password.component.html',
  styleUrls: ['./dialog-change-password.component.scss']
})
export class DialogChangePasswordComponent implements OnInit {


  dialogForm: FormGroup = this.formBuilder.group({
    currentPassword: [
      '', [Validators.required]
    ],
    newPassword: [
      '', [Validators.required]
    ],
    confirmPassword: [
      '', [Validators.required]
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog,
    public dialogRef: MatDialogRef<DialogMcuTokenComponent>,
    private oauthService: OauthService,
  ) { }

  get valForm(): FormGroup['controls'] {
    return this.dialogForm.controls;
  }

  onConfirm(): void {
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
    this.oauthService.changePassword({
      passwordNew: this.valForm.newPassword.value,
      passwordConfirm: this.valForm.confirmPassword.value,
      password: this.valForm.currentPassword.value,
    }).subscribe(res => {
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
