import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
    public dialogRef: MatDialogRef<DialogActionComponent>,
    private dialogActionService: DialogActionService
  ) { }

  loadSetting(): void {
    this.dialogActionService.action().subscribe(res => {
      this.action = res;
    });
  }

  onConfirm(): void {}

  ngOnInit(): void {
    this.loadSetting();
  }

}
