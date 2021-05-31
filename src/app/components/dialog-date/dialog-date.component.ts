import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UniversalSelect } from 'src/app/interfaces';

interface DialogData {
  currentDate?: number;
  dateFormatSelect?: UniversalSelect[];
}

@Component({
  selector: 'app-dialog-date',
  templateUrl: './dialog-date.component.html',
  styleUrls: ['./dialog-date.component.scss']
})
export class DialogDateComponent implements OnInit {

  actionForm: FormGroup = this.formBuilder.group({
    currentDate: [
      '', [Validators.required]
    ],
  });

  dateFormatSelect: UniversalSelect[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.valForm.currentDate.setValue(data?.currentDate || 0);
    this.dateFormatSelect = data?.dateFormatSelect || [];
  }

  getErrorMessage(control: string): string {
    if (this.valForm[control].hasError('required')) {
      return `Field required`;
    }
    return ``;
  }

  get valForm(): FormGroup['controls'] {
    return this.actionForm.controls;
  }

  onConfirm(): void {
    if (this.actionForm.invalid) {
      this.matSnackBar.open('Some field not valid, please check again', 'close', {
        duration: 3000
      });
      return;
    }
    this.dialogRef.close(this.valForm.currentDate.value);
  }

  ngOnInit(): void {
  }

}
