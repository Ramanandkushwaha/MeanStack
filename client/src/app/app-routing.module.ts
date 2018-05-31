import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
];


@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }