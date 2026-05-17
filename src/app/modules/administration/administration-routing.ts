import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { AdminsListPageComponent } from './pages/admins-list-page/admins-list-page.component'; 

const routes: Routes = [
  {
    path: '', 
    component: AdminPageComponent 
  },
  {
    path: 'users', 
    component: UsersPageComponent 
  },
  {
    path: 'admins', 
    component: AdminsListPageComponent 
  },
  {
    path: 'news',
    component: NewsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }