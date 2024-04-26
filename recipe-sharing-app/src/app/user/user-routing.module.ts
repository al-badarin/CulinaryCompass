import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthActivate } from '../guards/auth.activate';
import { LoggedInRedirectGuard } from '../guards/loggedInRedirectGuard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInRedirectGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedInRedirectGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthActivate],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
