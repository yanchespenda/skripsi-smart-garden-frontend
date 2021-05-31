import { AfterViewInit, Component, Inject, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogActionService } from '@component/dialog-action/dialog-action.service';
import { DialogConfirmComponent } from '@component/dialog-confirm/dialog-confirm.component';
import { DateTime } from 'luxon';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ActionParameter } from 'src/app/interfaces';

interface DialogData {
  settingType: number;
}

@Component({
  selector: 'app-dialog-action-setting',
  templateUrl: './dialog-action-setting.component.html',
  styleUrls: ['./dialog-action-setting.component.scss']
})
export class DialogActionSettingComponent implements OnInit, OnDestroy, AfterViewInit {

  dialogForm: FormGroup;

  isLoading = false;

  settingType: number;
  settingUrl: string[] = [
    'automation',
    'routine'
  ];

  switchParameterTemperature: Subscription;
  switchParameterMoisture: Subscription;

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
          null, [Validators.min(0), Validators.max(100)]
        ],
        automationParamaterSoilMoisture: [
          null, [Validators.min(0), Validators.max(100)]
        ],
        automationAttemp: [
          null, [Validators.required, Validators.min(0), Validators.max(10)]
        ],

        automationParamaterSoilTemperatureEnable: [
          null, []
        ],
        automationParamaterSoilTemperatureOperation: [
          null, []
        ],
        automationParamaterSoilMoistureEnable: [
          null, []
        ],
        automationParamaterSoilMoistureOperation: [
          null, []
        ]

      });
    } else if (this.settingType === 2) {
      this.dialogForm = this.formBuilder.group({
        routineEnable: [
          null, []
        ],
        routineSkipParamater: [
          null, []
        ],
        routineTime: [
          null, []
        ],
      });
    }
  }

  getErrorMessage(control: string): string {
    if (this.valForm[control].hasError('required')) {
      return `Field required`;
    } else if (this.valForm[control].hasError('min')) {
      return `Field must greater than equal to ${this.valForm[control].getError('min').min}`;
    } else if (this.valForm[control].hasError('max')) {
      return `Field must less than equal to ${this.valForm[control].getError('max').max}`;
    }
    return ``;
  }

  initSetting(): void {
    this.isLoading = true;
    this.dialogActionService.actionDetail(this.settingUrl[this.settingType - 1])
    .pipe(finalize(() => this.isLoading = false))
    .subscribe(res => {
      if (this.settingType === 1) {
        this.valForm.automationEnable.setValue(res.automationEnable || false);
        this.valForm.automationAttemp.setValue(res.automationAttemp || 0);

        res.automationParameter?.forEach(param => {
          if (param.sensor === 'soil.temperature') {
            this.valForm.automationParamaterSoilTemperature.setValue(param.value || 0);
            this.valForm.automationParamaterSoilTemperatureEnable.setValue(param.enable || false);
            if (param.operator === '>=') {
              this.valForm.automationParamaterSoilTemperatureOperation.setValue(true);
            } else {
              this.valForm.automationParamaterSoilTemperatureOperation.setValue(false);
            }
          } else if (param.sensor === 'soil.moisture') {
            this.valForm.automationParamaterSoilMoisture.setValue(param.value || 0);
            this.valForm.automationParamaterSoilMoistureEnable.setValue(param.enable || false);
            if (param.operator === '>=') {
              this.valForm.automationParamaterSoilMoistureOperation.setValue(true);
            } else {
              this.valForm.automationParamaterSoilMoistureOperation.setValue(false);
            }
          }
        });
      } else if (this.settingType === 2) {
        this.valForm.routineEnable.setValue(res.routineTaskEnable || false);
        this.valForm.routineSkipParamater.setValue(res.routineTaskSkipIfExceedParameter || false);
        if (res.routineTaskTime) {
          const convertTime = DateTime.fromISO(res.routineTaskTime).toJSDate();
          this.valForm.routineTime.setValue(convertTime || null);
        } else {
          this.valForm.routineTime.setValue(null);
        }
      }
    });
  }

  get valForm(): FormGroup['controls'] {
    return this.dialogForm.controls;
  }

  convertOperator(value: number | boolean): string {
    return value ? '>=' : '<=';
  }

  onConfirm(): void {
    if (this.dialogForm.invalid) {
      return;
    }
    const dialogRef = this.matDialog.open(DialogConfirmComponent, {
      data: {
        title: 'Save',
        content: 'Are you sure want save this settings?'
      },
      maxWidth: '300px',
      width: '100%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        const body: any = {};
        if (this.settingType === 1) {
          body.automationEnable = this.valForm.automationEnable.value;
          body.automationAttemp = this.valForm.automationAttemp.value;
          const parameter: ActionParameter[] = [];
          if (this.valForm.automationParamaterSoilTemperature.value) {
            const preParameter: ActionParameter = {
              enable: this.valForm.automationParamaterSoilTemperatureEnable.value ? true : false,
              sensor: 'soil.temperature',
              operator: this.convertOperator(Number(this.valForm.automationParamaterSoilTemperatureOperation.value)),
              value: this.valForm.automationParamaterSoilTemperature.value
            };
            parameter.push(preParameter);
          }
          if (this.valForm.automationParamaterSoilMoisture.value) {
            const preParameter: ActionParameter = {
              enable: this.valForm.automationParamaterSoilMoistureEnable.value ? true : false,
              sensor: 'soil.moisture',
              operator: this.convertOperator(Number(this.valForm.automationParamaterSoilMoistureOperation.value)),
              value: this.valForm.automationParamaterSoilMoisture.value
            };
            parameter.push(preParameter);
          }
          body.automationParameter = JSON.stringify(parameter);
        } else if (this.settingType === 2)  {
          body.routineEnable = this.valForm.routineEnable.value;
          body.routineSkipParamater = this.valForm.routineSkipParamater.value;
          body.routineTime = this.valForm.routineTime.value?.toISOString();
        }
        this.dialogActionService.actionDetailSave(this.settingUrl[this.settingType - 1], body)
          .pipe(finalize(() => this.isLoading = false))
          .subscribe(() => {
            this.matSnackBar.open('Setting saved', 'close', {
              duration: 3000
            });
            this.dialogRef.close(true);
          }, () => {
            this.matSnackBar.open('Something went wrong', 'close', {
              duration: 3000
            });
          });
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.settingType === 1) {
      this.switchParameterTemperature = this.valForm.automationParamaterSoilTemperatureEnable.valueChanges.subscribe(res => {
        const controlForm = this.valForm.automationParamaterSoilTemperature;
        if (res) {
          controlForm.setValidators([Validators.required, Validators.min(0), Validators.max(100)]);
        } else {
          controlForm.setValidators([Validators.min(0), Validators.max(100)]);
        }
        controlForm.updateValueAndValidity();
      });
      this.switchParameterMoisture = this.valForm.automationParamaterSoilMoistureEnable.valueChanges.subscribe(res => {
        const controlForm = this.valForm.automationParamaterSoilMoisture;
        if (res) {
          controlForm.setValidators([Validators.required, Validators.min(0), Validators.max(100)]);
        } else {
          controlForm.setValidators([Validators.min(0), Validators.max(100)]);
        }
        controlForm.updateValueAndValidity();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.switchParameterTemperature) {
      this.switchParameterTemperature.unsubscribe();
    }
    if (this.switchParameterMoisture) {
      this.switchParameterMoisture.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.initSetting();
  }

}
