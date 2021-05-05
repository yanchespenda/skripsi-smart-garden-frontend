import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@component/main/main.component';
import { SigninComponent } from '@component/signin/signin.component';
import { SignupComponent } from '@component/signup/signup.component';
import { OauthGuard } from './guards/oauth.guard';

const routes: Routes = [
  {
    path: 'oauth',
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'signup',
        component: SignupComponent,
      }
    ]
  },
  {
    path: 'home',
    component: MainComponent,
    canActivate: [OauthGuard],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
