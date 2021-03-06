import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ApiErrorResponse } from 'src/app/interfaces';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  @ViewChild('inputUsername', {static: true}) inputUsername: ElementRef;
  @ViewChild('inputPassword', {static: true}) inputPassword: ElementRef;

  isLoading = false;
  isErrorPrimary = false;
  pswdHide = true;
  errorMSG: string;
  errorMSGA: string;
  errorMSGB: string;

  signInForm: FormGroup = this.formBuilder.group({
    username: [
      '', [Validators.required]
    ],
    password: [
      '', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]
    ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private oauthService: OauthService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) { }

  getErrorMessagePrimary(): string {
    return this.errorMSG;
  }

  getErrorMessageUsername(): string {
    if (this.valA.username.hasError('required')) {
      this.errorMSGA = 'Please input your username';
    }
    return this.errorMSGA;
  }

  getErrorMessagePassword(): string {
    if (this.valA.password.hasError('required')) {
      this.errorMSGB = 'Please input your password';
    } else if (this.valA.password.hasError('minlength')) {
      this.errorMSGB = 'Password to short';
    }
    return this.errorMSGB;
  }

  get valA(): FormGroup['controls'] {
    return this.signInForm.controls;
  }

  async SubmitA(): Promise<void> {
    if (this.signInForm.invalid) {
      if (this.valA.username.invalid) {
        this.inputUsername.nativeElement.focus();
      } else if (this.valA.password.invalid) {
        this.inputPassword.nativeElement.focus();
      }
      return;
    }
    if (this.isLoading) {
      return;
    }

    this.isErrorPrimary = false;
    this.isLoading = true;

    this.oauthService.signIn(this.valA.username.value, this.valA.password.value)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(res => {
        console.log('res', res);
        this.oauthService.credentialsSet(res);

        this.matSnackBar.open('Signin in...', 'close', {
          duration: 3000
        });
        window.open('/home', '_self');
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.errorMSG = 'Something went wrong';
          this.isErrorPrimary = true;
        } else {
          if (err.status >= 400 && err.status < 500) {
            const errorData: ApiErrorResponse = err.error;
            this.errorMSG = errorData.message;
            this.isErrorPrimary = true;
          } else {
            this.errorMSG = 'Something went wrong';
            this.isErrorPrimary = true;
          }
        }
      });

  }

  ngOnInit(): void {
  }

}
