import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { HttpClientModule } from '@angular/common/http'
import { PaginationModule } from 'ngx-bootstrap/pagination'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faTrash, faTrashRestore } from '@fortawesome/free-solid-svg-icons'
import { PreviewImageComponent } from './preview-image/preview-image.component'
import { EmojiListComponent } from './emoji-list/emoji-list.component';
import { AllEmojiComponent } from './all-emoji/all-emoji.component';
import { FavEmojiComponent } from './fav-emoji/fav-emoji.component';
import { DelEmojiComponent } from './del-emoji/del-emoji.component'

@NgModule({
  declarations: [
    AppComponent,
    PreviewImageComponent,
    EmojiListComponent,
    AllEmojiComponent,
    FavEmojiComponent,
    DelEmojiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    PaginationModule.forRoot(),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faStar, faTrash, faTrashRestore)
  }
}
