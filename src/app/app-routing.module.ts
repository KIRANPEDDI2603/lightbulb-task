import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonsListComponent } from './persons-list/persons-list.component';
const routes: Routes = [
  { path: 'persons', component: PersonsListComponent },
  { path: '', redirectTo: 'persons', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
