import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ApiErrorResponse } from 'src/app/interfaces';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('inputUsername', {static: true}) inputUsername: ElementRef;
  @ViewChild('inputPassword', {static: true}) inputPassword: ElementRef;
  @ViewChild('inputToken', {static: true}) inputToken: ElementRef;

  isLoading = false;
  isErrorPrimary = false;
  pswdHide = true;
  errorMSG: string;
  errorMSGA: string;
  errorMSGB: string;
  errorMSGC: string;

  signUpForm: FormGroup = this.formBuilder.group({
    username: [
      '', [Validators.required]
    ],
    password: [
      '', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]
    ],
    token: [
      '', [Validators.required]
    ],
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
    } else if (this.valA.password.hasError('maxlength')) {
      this.errorMSGB = 'Password to long';
    }
    return this.errorMSGB;
  }

  getErrorMessageToken(): string {
    if (this.valA.token.hasError('required')) {
      this.errorMSGC = 'Please input the token';
    }
    return this.errorMSGC;
  }

  get valA(): FormGroup['controls'] {
    return this.signUpForm.controls;
  }

  async SubmitA(): Promise<void> {
    if (this.signUpForm.invalid) {
      if (this.valA.username.invalid) {
        this.inputUsername.nativeElement.focus();
      } else if (this.valA.password.invalid) {
        this.inputPassword.nativeElement.focus();
      } else if (this.valA.token.invalid) {
        this.inputToken.nativeElement.focus();
      }
      return;
    }
    if (this.isLoading) {
      return;
    }

    this.isErrorPrimary = false;
    this.isLoading = true;

    this.oauthService.signUp(this.valA.username.value, this.valA.password.value, this.valA.token.value)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(res => {
        console.log('res', res);

        this.matSnackBar.open('Signup successfully', 'close', {
          duration: 3000
        });
        this.router.navigate(['/oauth/signin']);
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
