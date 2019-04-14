import {Component, OnInit} from '@angular/core'
import {EmojiService} from '../emoji.service'
import {Emoji, EmojiType} from '../type'
import {filter} from 'rxjs/operators'
import {EmojiTypeChange} from '../emoji-list/emoji-list.component'

@Component({
  selector: 'app-all-emoji',
  templateUrl: './all-emoji.component.html',
  styleUrls: ['./all-emoji.component.scss']
})
export class AllEmojiComponent implements OnInit {
  emojies: Array<Emoji> = []
  loading = true

  constructor(private emojiService: EmojiService) { }

  public handleStateChange({ item, newType }: EmojiTypeChange) {
    if (item.type === newType) {
      newType = EmojiType.None
    }

    console.log(newType.toString())
    if (newType === EmojiType.Deleted) {
      const index = this.emojies.indexOf(item)
      if (index > -1) {
        this.emojies.splice(index, 1)
      }
    }

    this.emojiService.updateEmoji({ item, newType })
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
