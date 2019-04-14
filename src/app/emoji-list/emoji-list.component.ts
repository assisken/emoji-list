import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core'
import { Emoji } from '../type'
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api'

export interface StateChange<T> {
  item: T
  field: string
  state: any
}

@Component({
  selector: 'app-emoji-list',
  templateUrl: './emoji-list.component.html',
  styleUrls: ['./emoji-list.component.scss']
})
export class EmojiListComponent implements OnInit {
  @Input() emojiList: Array<Emoji>
  @Output() stateChanged = new EventEmitter<StateChange<Emoji>>()
  preview?: Emoji
  currentPage = 1
  perPage = 10

  constructor() { }

  ngOnInit() {
  }

  _stateChanged({ item, field, state }: StateChange<Emoji>) {
    this.stateChanged.emit({ item, field, state })
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
