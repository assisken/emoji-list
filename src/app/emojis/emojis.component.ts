import { Component, OnInit } from '@angular/core'
import { EmojiService } from '../emoji.service'
import { Emoji } from '../type'
import { ActivatedRoute } from '@angular/router'
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api'
import { StateChange } from '../emoji-list/emoji-list.component'

@Component({
  selector: 'app-emojis',
  templateUrl: './emojis.component.html',
  styleUrls: ['./emojis.component.scss']
})
export class EmojisComponent implements OnInit {
  listType: 'fav' | 'del' | string
  emojis: Array<Emoji>
  currentPage = 1
  totalCount = 1000

  constructor(private emojiService: EmojiService, private route: ActivatedRoute) { }

  private fetchEmojis(page: number, itemsPerPage: number) {
    const from = itemsPerPage * (page - 1)
    const to = from + itemsPerPage

    switch (this.listType) {
      case 'fav':
        this.totalCount = this.emojiService.favLength()
        return this.emojiService.getFavList(from, to)
      case 'del':
        this.totalCount = this.emojiService.delLength()
        return this.emojiService.getDelList(from, to)
      default:
        this.totalCount = this.emojiService.length()
        return this.emojiService.getEmojiList(from, to)
    }
  }

  public handlePageChanged(event: PageChangedEvent): void {
    this.currentPage = event.page
    this.fetchEmojis(event.page, event.itemsPerPage)
      .then(res => this.emojis = res)
  }

  public handleStateChange({ item, field, state }: StateChange<Emoji>) {
    item.set(field, state)
    this.totalCount = this.emojiService.length()
    this.fetchEmojis(this.currentPage, 10)
        .then(res => { this.emojis = res })
  }

  ngOnInit() {
    this.totalCount = this.emojiService.length()
    this.route.queryParamMap.subscribe(queryParams => {
      this.listType = queryParams.get('type')
      this.fetchEmojis(this.currentPage, 10)
        .then(res => { this.emojis = res })
    })
  }
}
