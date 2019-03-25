// app-routing.module.ts -- Ryan Watson -- 300920674 -- 02/06/19
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactDeleteComponent } from './contacts/contact-delete/contact-delete.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'about', component: AboutComponent },
  {path: 'projects', component: ProjectsComponent },
  {path: 'services', component: ServicesComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'contact/contact-list', component: ContactListComponent, data: {title: 'Contact List'}, canActivate: [AuthGuard] },

  { path: 'contact/contact-list/add', component: ContactDetailsComponent, data: {title: 'Add Contact'}, canActivate: [AuthGuard] },
  { path: 'contact/contact-list/edit/:id', component: ContactDetailsComponent, data: {title: 'Edit Contact'}, canActivate: [AuthGuard] },
  { path: 'contact/contact-list/delete/:id', component: ContactDeleteComponent, data: {title: 'Add Contact'}, canActivate: [AuthGuard] },

  { path: 'register', component: RegisterComponent, data: {title: 'Register'} },
  { path: 'login', component: LoginComponent, data: {title: 'Login'} },
  { path: 'logout', redirectTo: '/login', pathMatch: 'full' },

  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
