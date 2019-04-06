import { Component, OnInit } from '@angular/core';
import { EmojiService } from '../emoji.service';
import { Emoji } from '../type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emojis',
  templateUrl: './emojis.component.html',
  styleUrls: ['./emojis.component.scss']
})
export class EmojisComponent implements OnInit {
  listType: 'fav' | 'del' | string
  emojis: Array<Emoji>
  items = 0
  perPage = 10;
  page = 1;
  preview?: Emoji

  constructor(private emojiService: EmojiService, private route: ActivatedRoute) { }

  private from() {
    return this.perPage * (this.page - 1)
  }

  private to() {
    return this.from() + this.perPage
  }

  private updateItems() {
    console.log(this.listType)
    switch (this.listType) {
      case 'fav':
        this.items = this.emojiService.favLength()
        break
      case 'del':
        this.items = this.emojiService.delLength()
        break
      default:
        this.items = this.emojiService.length()
        break
    }
  }

  private fetchEmojis() {
    switch (this.listType) {
      case 'fav':
        return this.emojiService.getFavList(this.from(), this.to())
      case 'del':
        return this.emojiService.getDelList(this.from(), this.to())
      default:
        return this.emojiService.getEmojiList(this.from(), this.to())
    }
  }

  public handleFavorite(emoji: Emoji) {
    if (emoji.favorite) {
      this.emojiService.removeFromFavorite(emoji)
    } else {
      this.emojiService.addToFavorite(emoji)
    }

    this.fetchEmojis()
    .then(res => {
      this.emojis = res
      this.updateItems()
    })
  }

  public handleDeleted(emoji: Emoji) {
    if (emoji.deleted) {
      this.emojiService.removeFromDeleted(emoji)
    } else {
      this.emojiService.addToDeleted(emoji)
    }

    this.fetchEmojis()
    .then(res => {
      this.emojis = res
      this.updateItems()
    })
  }

  public pageChanged(event: any): void {
    this.page = event.page;
    this.fetchEmojis()
      .then(res => this.emojis = res)
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      this.listType = queryParams.get("type")
      this.fetchEmojis()
      .then(res => {
        this.emojis = res
        this.updateItems()
      })
    })
  }

  display(event) {
    this.preview = { name: event.target.alt, src: event.target.src };
  }

  hide() {
    this.preview = null
  }
}
