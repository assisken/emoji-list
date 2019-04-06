import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmojisComponent } from './emojis/emojis.component';

const routes: Routes = [
  { path: '', redirectTo: '/emoji?type=all', pathMatch: 'full' },
  { path: 'emoji', component: EmojisComponent, pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
