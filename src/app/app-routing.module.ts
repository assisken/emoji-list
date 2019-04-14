import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import {AllEmojiComponent} from './all-emoji/all-emoji.component'
import {FavEmojiComponent} from './fav-emoji/fav-emoji.component'
import {DelEmojiComponent} from './del-emoji/del-emoji.component'

const routes: Routes = [
  { path: '', redirectTo: '/all', pathMatch: 'full' },
  { path: 'all', component: AllEmojiComponent },
  { path: 'fav', component: FavEmojiComponent },
  { path: 'del', component: DelEmojiComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
