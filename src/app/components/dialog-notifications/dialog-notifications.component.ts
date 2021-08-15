import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, mergeMapTo } from 'rxjs/operators';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { NotificationTelegram } from 'src/app/interfaces';
import { DialogNotificationsService } from './dialog-notifications.service';

@Component({
  selector: 'app-dialog-notifications',
  templateUrl: './dialog-notifications.component.html',
  styleUrls: ['./dialog-notifications.component.scss']
})
export class DialogNotificationsComponent implements OnInit {

  isLoading = false;

  isTelegramLoad = false;
  isTelegramLoadError = false;
  userOutput: NotificationTelegram = null;

  telegramBotName = 'smartgarden07_bot';
  telegramConfigs = {
    buttonStyle: 'medium',
    cornerRadius: 8,
    accessToWriteMessages: true
  };

  dialogForm: FormGroup = this.formBuilder.group({
    emailEnable: [
      null, []
    ],
    email: [
      null, [Validators.email]
    ],
    telegramEnable: [
      null, []
    ],

    webPushEnable: [
      null, []
    ],
    webPush: [
      null, []
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogNotificationsComponent>,
    private notificationsService: DialogNotificationsService,
    private afMessaging: AngularFireMessaging
  ) { }

  getErrorMessage(control: string): string {
    if (this.valForm[control].hasError('required')) {
      return `Field required`;
    } else if (this.valForm[control].hasError('email')) {
      return `Email not valid`;
    } else if (this.valForm[control].hasError('min')) {
      return `Field must greater than equal to ${this.valForm[control].getError('min').min}`;
    } else if (this.valForm[control].hasError('max')) {
      return `Field must less than equal to ${this.valForm[control].getError('max').max}`;
    }
    return ``;
  }

  get valForm(): FormGroup['controls'] {
    return this.dialogForm.controls;
  }

  onConfirm(): void {
    if (this.dialogForm.invalid) {
      this.matSnackBar.open('Some field not valid, please check again', 'close', {
        duration: 3000
      });
      return;
    }

    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.notificationsService.postNotifications({
      email: this.valForm.email.value || null,
      emailEnable: this.valForm.emailEnable.value || false,
      telegramEnable: this.valForm.telegramEnable.value || false,
      telegram: this.userOutput || null,
      webPushEnable: this.valForm.webPushEnable.value || false,
      webPush: this.valForm.webPush.value || null,
    })
    .pipe(
      finalize(() => this.isLoading = false)
    )
    .subscribe(res => {
      this.matSnackBar.open(res.message || 'Saved', 'close', {
        duration: 3000
      });
    },
    (err: HttpErrorResponse) => {
      console.error('err', err);
      this.matSnackBar.open('Something went wrong', 'close', {
        duration: 3000
      });
    });
  }

  onTelegramLoad(): void {
    this.isTelegramLoad = true;
  }

  onTelegramLoadError(): void {
    this.isTelegramLoadError = true;
  }

  onTelegramLogin(user: NotificationTelegram): void {
    this.userOutput = user;
    this.notificationsService.postNotificationTelegramInit(user.id)
    .subscribe(() => {
      this.matSnackBar.open('Sending initial message', 'close', {
        duration: 3000
      });
    },
    (err: HttpErrorResponse) => {
      console.error('err', err);
      this.matSnackBar.open('Something went wrong', 'close', {
        duration: 3000
      });
    });
  }

  webPushNotificationModelHandler(newObj: any): void {
    if (newObj) {
      this.requestPermission();
    }
  }

  requestPermission(): void {
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => {
          this.valForm.webPush.setValue(token);
        },
        (error) => { console.error(error); }
      );
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.notificationsService.getNotifications()
    .pipe(
      finalize(() => this.isLoading = false)
    )
    .subscribe(res => {
      this.valForm.email.setValue(res.email);
      this.valForm.emailEnable.setValue(res.emailEnable);
      this.valForm.telegramEnable.setValue(res.telegramEnable);
      this.valForm.webPushEnable.setValue(res.webPushEnable);
      this.userOutput = res.telegram;
      this.valForm.webPush.setValue(res.webPush);
    },
    (err: HttpErrorResponse) => {
      console.error('err', err);
      this.matSnackBar.open('Something went wrong', 'close', {
        duration: 3000
      });
    });
  }

}
