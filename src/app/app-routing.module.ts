import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { LoginComponent } from './Pages/login/login.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { ProfileComponent } from './Pages/profile/profile.component';

//routes users to pages
const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: 'profile', component: MainLayoutComponent,
    children: [{path: '', component: ProfileComponent}]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
