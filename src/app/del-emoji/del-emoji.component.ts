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

  public handleStateChange({ item, newType }: EmojiTypeChange) {
    const index = this.emojies.indexOf(item)
    if (index > -1) {
      this.emojies.splice(index, 1)
    }

    newType = EmojiType.None
    this.emojiService.updateEmoji({ item, newType })
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
