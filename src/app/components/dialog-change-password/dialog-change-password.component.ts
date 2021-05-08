import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    public dialogRef: MatDialogRef<DialogMcuTokenComponent>,
    private oauthService: OauthService,
  ) { }

  get valForm(): FormGroup['controls'] {
    return this.dialogForm.controls;
  }

  onConfirm(): void {}

  ngOnInit(): void {
  }

}
