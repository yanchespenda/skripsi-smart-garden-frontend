import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogActionSettingComponent } from '@component/dialog-action-setting/dialog-action-setting.component';
import { DialogConfirmComponent } from '@component/dialog-confirm/dialog-confirm.component';
import { DateTime } from 'luxon';
import { finalize } from 'rxjs/operators';
import { Action } from 'src/app/interfaces';
import { DialogActionService } from './dialog-action.service';

@Component({
  selector: 'app-dialog-action',
  templateUrl: './dialog-action.component.html',
  styleUrls: ['./dialog-action.component.scss']
})
export class DialogActionComponent implements OnInit {

  action: Action;
  isLoading = false;

  constructor(
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogActionComponent>,
    private dialogActionService: DialogActionService
  ) { }

  loadSetting(): void {
    this.isLoading = true;
    this.dialogActionService.action()
    .pipe(
      finalize(() => this.isLoading = false)
    )
    .subscribe(res => {
      res.lastAction = res.lastAction ? DateTime.fromISO(res.lastAction).toLocaleString(DateTime.DATETIME_FULL) : null;
      this.action = res;
    });
  }

  openSetting(settingType: number): void {
    const dialogRef = this.matDialog.open(DialogActionSettingComponent, {
      data: {
        settingType
      },
      maxWidth: '400px',
      width: '100%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSetting();
      }
    });
  }

  onConfirm(): void {}

  onFlushNow(): void {
    const dialogRef = this.matDialog.open(DialogConfirmComponent, {
      data: {
        title: 'Flush',
        content: 'Are you sure want flush now?'
      },
      maxWidth: '400px',
      width: '100%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogActionService.flushNow()
        .pipe(
          finalize(() => this.loadSetting())
        )
        .subscribe(() => {
          this.matSnackBar.open('Flushing now...', 'close', {
            duration: 3000
          });
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadSetting();
  }

}
