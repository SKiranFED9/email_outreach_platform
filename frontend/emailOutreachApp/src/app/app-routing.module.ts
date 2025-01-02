import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { RegisterUserComponent } from './register-user/register-user.component';

const routes: Routes = [
  { 
    path: 'dashboard', component:DashboardComponent
  },
  {
    path:'login', component:UserLoginComponent
  },
  {
    path:'register', component:RegisterUserComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
