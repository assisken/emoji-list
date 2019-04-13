import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
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
  @Input() emojiCount: number
  @Output() pageChanged = new EventEmitter<PageChangedEvent>()
  @Output() stateChanged = new EventEmitter<StateChange<Emoji>>()
  preview?: Emoji

  constructor() { }

  ngOnInit() {
  }

  _stateChanged({ item, field, state }: StateChange<Emoji>) {
    this.stateChanged.emit({ item, field, state })
  }

  _pageChanged(pageChangedEvent: PageChangedEvent) {
    this.pageChanged.emit(pageChangedEvent)
  }

  display(emoji: Emoji) {
    this.preview = emoji
  }

  hide() {
    this.preview = null
  }
}
