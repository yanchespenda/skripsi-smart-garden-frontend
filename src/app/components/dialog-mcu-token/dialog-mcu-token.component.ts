import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OauthService } from 'src/app/services/oauth.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-dialog-mcu-token',
  templateUrl: './dialog-mcu-token.component.html',
  styleUrls: ['./dialog-mcu-token.component.scss']
})
export class DialogMcuTokenComponent implements OnInit {

  @ViewChild('inputToken', {static: true}) inputToken: ElementRef;

  isLoading = false;
  isNull = false;

  dialogForm: FormGroup = this.formBuilder.group({
    mcuToken: [
      '', []
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogMcuTokenComponent>,
    private oauthService: OauthService,
    private clipboard: Clipboard,
  ) { }

  get valForm(): FormGroup['controls'] {
    return this.dialogForm.controls;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  initMcuToken(): void {
    this.oauthService.getMcuToken().subscribe(res => {
      if (res.token !== null) {
        this.isNull = false;
        this.valForm.mcuToken.setValue(res.token);
      } else {
        this.isNull = true;
      }
    });
  }

  generateToken(): void {
    this.matSnackBar.open('Generate token...', 'close', {
      duration: 3000
    });
    this.oauthService.createMcuToken().subscribe(res => {
      if (res.token !== null) {
        this.isNull = false;
        this.valForm.mcuToken.setValue(res.token);
      } else {
        this.isNull = true;
      }
    });
  }

  copyToken(): void {
    if (!this.isNull) {
      this.matSnackBar.open('Token copied', 'close', {
        duration: 3000
      });
      this.clipboard.copy(this.valForm.mcuToken.value);
    }
  }

  ngOnInit(): void {
    this.initMcuToken();
  }

}
