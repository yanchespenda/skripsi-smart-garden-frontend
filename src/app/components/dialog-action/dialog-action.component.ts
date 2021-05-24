import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogConfirmComponent } from '@component/dialog-confirm/dialog-confirm.component';
import { Action } from 'src/app/interfaces';
import { DialogActionService } from './dialog-action.service';

@Component({
  selector: 'app-dialog-action',
  templateUrl: './dialog-action.component.html',
  styleUrls: ['./dialog-action.component.scss']
})
export class DialogActionComponent implements OnInit {

  action: Action;

  constructor(
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogActionComponent>,
    private dialogActionService: DialogActionService
  ) { }

  loadSetting(): void {
    this.dialogActionService.action().subscribe(res => {
      this.action = res;
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
        this.dialogActionService.flushNow().subscribe(() => {
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
