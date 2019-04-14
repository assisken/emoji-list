import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Emoji} from './type'
import {map} from 'rxjs/operators'
import {from, Observable, Subject} from 'rxjs'
import {StateChange} from './emoji-list/emoji-list.component'

@Injectable({
  providedIn: 'root'
})
export class EmojiService {

  constructor(private http: HttpClient) { }
  private emojies: Array<Emoji> = []
  private observable = new Subject<Emoji>()
  private savedItems: Array<Emoji> = []

  public updateEmoji({ item, field, state }: StateChange<Emoji>) {
    item.set(field, state)
    switch (state) {
      case true:
        this.savedItems.push(item)
        break
      case false:
        const found = this.savedItems.find(it => it.name === item.name)
        const index = this.savedItems.indexOf(found)
        console.log(index)
        this.savedItems.splice(index, 1)
        break
    }
    localStorage.setItem('savedItems', JSON.stringify(this.savedItems));
  }

  public getEmojiList(): Observable<Emoji> {
    if (this.savedItems.length === 0) {
      const items = localStorage.getItem('savedItems')
      if (items) {
        this.savedItems = JSON.parse(items)
      }
    }

    if (this.emojies.length === 0) {
      this.fetchEmojiList()
        .subscribe(
          res => {
            this.emojies = res
            this.emojies.forEach(item => this.observable.next(item))
            this.observable.complete()
          },
          err => this.observable.error(err)
        )
      return this.observable
    }
    return from(this.emojies)
  }

  private fetchEmojiList() {
    return this.http.get<object>(
      'https://api.github.com/emojis',
      { observe: 'body' }
      )
      .pipe(
        map(items => Object.keys(items).map(key => {
          const item = this.updateBySaved(key)
          if (item) {
            return new Emoji(item.name, item.src, item.favorite, item.deleted)
          }
          return new Emoji(key, items[key])
        })),
      )
  }

  private updateBySaved(name: string): Emoji | undefined {
    return this.savedItems.find(item => item.name === name)
  }
}
