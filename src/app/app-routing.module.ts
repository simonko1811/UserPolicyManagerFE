import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { PolicyListComponent } from './components/policy-list/policy-list.component';
import { PolicyFormComponent } from './components/policy-form/policy-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'users/new', component: UserFormComponent },
  { path: 'users/edit/:name', component: UserFormComponent },
  { path: 'policies', component: PolicyListComponent },
  { path: 'policies/new', component: PolicyFormComponent },
  { path: 'policies/edit/:id', component: PolicyFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
