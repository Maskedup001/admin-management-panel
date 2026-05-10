import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdministrationRoutingModule } from './administration-routing';
import { FormsModule } from '@angular/forms';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AddUserFormComponent } from './pages/users-page/components/add-user-form/add-user-form.component';
import { EditUserComponent } from './pages/users-page/components/edit-user/edit-user.component';
import { AdminsListPageComponent } from './pages/admins-list-page/admins-list-page.component';
import { EditAdminComponent } from './pages/admins-list-page/components/edit-admin/edit-admin.component';
import { AddAdminFormComponent } from './pages/admins-list-page/components/add-admin-form/add-admin-form.component';


@NgModule({
  declarations: [
    AdminPageComponent,
    UsersPageComponent,
    NewsPageComponent,
    AddUserFormComponent,
    EditUserComponent,
    AdminsListPageComponent,
    EditAdminComponent,
    AddAdminFormComponent
  ],  imports: [
    AdministrationRoutingModule,
    CommonModule,
    FormsModule,
		SharedModule,
    ReactiveFormsModule
  ]
})export class AdministrationModule { }