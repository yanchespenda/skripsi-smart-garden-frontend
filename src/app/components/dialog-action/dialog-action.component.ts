import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogActionHistoryComponent } from '@component/dialog-action-history/dialog-action-history.component';
import { DialogActionSettingComponent } from '@component/dialog-action-setting/dialog-action-setting.component';
import { DialogConfirmComponent } from '@component/dialog-confirm/dialog-confirm.component';
import { DateTime } from 'luxon';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Action, ActionHistory } from 'src/app/interfaces';
import { DialogActionService } from './dialog-action.service';

@Component({
  selector: 'app-dialog-action',
  templateUrl: './dialog-action.component.html',
  styleUrls: ['./dialog-action.component.scss']
})
export class DialogActionComponent implements OnInit {

  action: Action;
  history: ActionHistory = {
    list: [],
    total: 0
  };
  isLoading = false;

  constructor(
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogActionComponent>,
    private dialogActionService: DialogActionService
  ) { }

  formatDateTimeFull(date: string): string {
    return DateTime.fromISO(date).toFormat('LLL dd, yyyy HH:mm:ss') || null;
  }

  formatRoutineTime(date: string): string {
    const rawDate = DateTime.fromISO(date);
    if (rawDate) {
      const getMinutes = rawDate.toFormat('mm');
      const getHours = rawDate.toFormat('HH');

      return `Every on ${getHours}:${getMinutes} a day`;
    }
    return null;
  }

  loadSetting(): void {
    this.isLoading = true;
    forkJoin([
      this.dialogActionService.action(),
      this.dialogActionService.history()
    ])
    .pipe(
      finalize(() => this.isLoading = false)
    )
    .subscribe(res => {
      res[0].lastAction = res[0].lastAction ? DateTime.fromISO(res[0].lastAction).toLocaleString(DateTime.DATETIME_FULL) : null;
      this.action = res[0];

      this.history = res[1];
    });
  }

  openHistory(): void {
    const dialogRef = this.matDialog.open(DialogActionHistoryComponent, {
      maxWidth: '500px',
      width: '100%'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadSetting();
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
