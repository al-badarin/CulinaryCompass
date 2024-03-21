import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
// import { ProfileComponent } from './profile/profile.component';
// import { AuthActivate } from '../core/guards/auth.activate';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    //   TODO:
    // canActivate: [AuthActivate],
  },
  {
    path: 'register',
    component: RegisterComponent,
    //   TODO:
    // canActivate: [AuthActivate],
  },
  //   {
  //     path: 'profile',
  //     component: ProfileComponent,
  //   TODO:
      // canActivate: [AuthActivate],
  //   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
