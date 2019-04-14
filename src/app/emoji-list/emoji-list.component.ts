import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core'
import {Emoji, EmojiType} from '../type'
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api'

export interface EmojiTypeChange {
  item: Emoji,
  newType: EmojiType
}

@Component({
  selector: 'app-emoji-list',
  templateUrl: './emoji-list.component.html',
  styleUrls: ['./emoji-list.component.scss']
})
export class EmojiListComponent implements OnInit {
  @Input() emojiList: Array<Emoji>
  @Output() typeChanged = new EventEmitter<EmojiTypeChange>()
  preview?: Emoji
  currentPage = 1
  perPage = 10

  constructor() { }

  ngOnInit() {
  }

  _typeChanged(item: Emoji, type: 'favorite' | 'deleted') {
    let newType: EmojiType
    switch (type) {
      case 'favorite':
        newType = EmojiType.Favorite
        break
      case 'deleted':
        newType = EmojiType.Deleted
        break
      default:
        newType = EmojiType.None
    }
    this.typeChanged.emit({ item, newType })
  }

  currentList() {
    const from = this.perPage * (this.currentPage - 1)
    const to = from + this.perPage

    return this.emojiList.slice(from, to)
  }

  pageChanged(pageChangedEvent: PageChangedEvent) {
    this.currentPage = pageChangedEvent.page
  }

  display(emoji: Emoji) {
    this.preview = emoji
  }

  hide() {
    this.preview = null
  }
}
