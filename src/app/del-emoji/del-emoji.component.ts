import {Component, OnInit} from '@angular/core'
import {Emoji, EmojiType} from '../type'
import {EmojiService} from '../emoji.service'
import {filter} from 'rxjs/operators'
import {EmojiTypeChange} from '../emoji-list/emoji-list.component'

@Component({
  selector: 'app-del-emoji',
  templateUrl: './del-emoji.component.html',
  styleUrls: ['./del-emoji.component.scss']
})
export class DelEmojiComponent implements OnInit {
  emojies: Array<Emoji> = []

  constructor(private emojiService: EmojiService) { }

  public delete(emoji: Emoji) {
    const index = this.emojies.indexOf(emoji)
    if (index > -1) {
      this.emojies.splice(index, 1)
    }

    this.emojiService.updateEmoji(emoji, EmojiType.None)
  }

  ngOnInit() {
    console.log(this.emojies)
    this.emojiService.getEmojiList()
      .pipe(
        filter(item => item.deleted())
      )
      .subscribe(
        res => this.emojies.push(res),
        err => console.log(err)
      )
  }
}
