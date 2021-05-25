import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogActionService } from '@component/dialog-action/dialog-action.service';

interface DialogData {
  settingType: number;
}

@Component({
  selector: 'app-dialog-action-setting',
  templateUrl: './dialog-action-setting.component.html',
  styleUrls: ['./dialog-action-setting.component.scss']
})
export class DialogActionSettingComponent implements OnInit {

  dialogForm: FormGroup;

  settingType: number;
  settingUrl: string[] = [
    'automation',
    'routine'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog,
    public dialogRef: MatDialogRef<DialogActionSettingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogActionService: DialogActionService,
  ) {
    this.settingType = data?.settingType ? data.settingType : 1;

    if (this.settingType === 1) {
      this.dialogForm = this.formBuilder.group({
        automationEnable: [
          null, [Validators.required]
        ],
        automationParamaterSoilTemperature: [
          null, [Validators.required, Validators.min(0), Validators.max(100)]
        ],
        automationParamaterSoilMoisture: [
          null, [Validators.required, Validators.min(0), Validators.max(100)]
        ],
        automationAttemp: [
          null, [Validators.required, Validators.min(0), Validators.max(3)]
        ],
      });
    } else if (this.settingType === 2) {
      this.dialogForm = this.formBuilder.group({
        routineEnable: [
          null, [Validators.required]
        ],
        routineSkipParamater: [
          null, [Validators.required]
        ],
        routineTime: [
          null, [Validators.required]
        ],
      });
    }
  }

  get valForm(): FormGroup['controls'] {
    return this.dialogForm.controls;
  }

  onConfirm(): void {}

  ngOnInit(): void {
  }

}
