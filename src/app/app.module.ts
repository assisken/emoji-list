import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EmojisComponent } from './emojis/emojis.component';

import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faTrash, faTrashRestore } from '@fortawesome/free-solid-svg-icons';
import { PreviewImageComponent } from './preview-image/preview-image.component';
import { EmojiListComponent } from './emoji-list/emoji-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EmojisComponent,
    PreviewImageComponent,
    EmojiListComponent
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
    library.add(faStar, faTrash, faTrashRestore);
  }
}
