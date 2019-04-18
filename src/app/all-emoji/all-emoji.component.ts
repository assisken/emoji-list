import {Component, OnInit} from '@angular/core'
import {EmojiService} from '../emoji.service'
import {Emoji, EmojiType} from '../type'
import {filter} from 'rxjs/operators'

@Component({
  selector: 'app-all-emoji',
  templateUrl: './all-emoji.component.html',
  styleUrls: ['./all-emoji.component.scss']
})
export class AllEmojiComponent implements OnInit {
  emojies: Array<Emoji> = []
  loading = true

  constructor(private emojiService: EmojiService) { }

  public delete(emoji: Emoji) {
    const index = this.emojies.indexOf(emoji)
    if (index > -1) {
      this.emojies.splice(index, 1)
    }

    this.emojiService.updateEmoji(emoji, EmojiType.Deleted)
  }

  public favorite(emoji: Emoji) {
    const newType = emoji.favorite() ? EmojiType.None : EmojiType.Favorite
    this.emojiService.updateEmoji(emoji, newType)
  }

  ngOnInit() {
    this.emojiService.getEmojiList()
      .pipe(
        filter(item => item.type !== EmojiType.Deleted)
      )
      .subscribe(
        res => this.emojies.push(res),
        err => console.log(err),
        () => this.loading = false
      )
  }

}
