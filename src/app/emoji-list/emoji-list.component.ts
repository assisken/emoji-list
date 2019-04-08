import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Emoji } from '../type';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';

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
  @Output() onPageChanged = new EventEmitter<PageChangedEvent>()
  @Output() onStateChange = new EventEmitter<StateChange<Emoji>>()
  preview?: Emoji

  constructor() { }

  ngOnInit() {
  }

  stateChange({ item, field, state } : StateChange<Emoji>) {
    this.onStateChange.emit({ item, field, state })
  }

  pageChanged(pageChangedEvent: PageChangedEvent) {
    this.onPageChanged.emit(pageChangedEvent)
  }

  display(emoji: Emoji) {
    this.preview = emoji;
  }

  hide() {
    this.preview = null
  }
}
