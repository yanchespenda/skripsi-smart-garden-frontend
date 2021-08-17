import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

interface DialogData {
  title?: string;
  content?: string;

  isVerify?: boolean;
  verifyText?: string;
}

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

  title: string;
  content: string;

  isVerify = false;
  verifyText: string;

  actionForm: FormGroup = this.formBuilder.group({
    verifyText: [
      '', [Validators.required]
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.title = data?.title ? data.title : 'Confirm';
    this.content = data?.content ? data.content : 'Are you sure?';
    this.isVerify = data?.isVerify ? data.isVerify : false;
    this.verifyText = data?.verifyText ? data.verifyText : 'CONFIRM';
  }

  get valForm(): FormGroup['controls'] {
    return this.actionForm.controls;
  }

  onConfirm(): void {
    if (!this.isVerify) {
      this.dialogRef.close(true);
      return;
    }

    if (!this.actionForm.valid) {
      this.matSnackBar.open('Verify required', 'close', {
        duration: 3000
      });
      return;
    }

    if (this.valForm.verifyText.value === this.verifyText) {
      this.dialogRef.close(true);
      return;
    } else {
      this.matSnackBar.open('Verify not same', 'close', {
        duration: 3000
      });
      return;
    }
  }

  ngOnInit(): void {
  }

}
