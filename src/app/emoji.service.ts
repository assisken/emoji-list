import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emoji } from './type';

@Injectable({
  providedIn: 'root'
})
export class EmojiService {
  private favCount: number = 0
  private delCount: number = 0
  private emoji: Array<Emoji> = []

  constructor(private http: HttpClient) { }

  private async fetchEmojiList() {
    console.log('request sent')
    const prom = this.http.get<Object>('https://api.github.com/emojis', { observe: 'body' }).toPromise()
    const response = await prom
    for (const key of Object.keys(response)) {
      this.emoji.push({ name: key, src: response[key] })
    }
  }

  public async getEmojiList(from: number, to: number): Promise<Emoji[]> {
    if (this.emoji.length === 0) {
      await this.fetchEmojiList()
    }
    return this.emoji.filter(elem => !elem.deleted).slice(from, to)
  }

  public async getFavList(from: number, to: number) {
    return this.emoji.filter(elem => elem.favorite).slice(from, to)
  }

  public async getDelList(from: number, to: number) {
    return this.emoji.filter(elem => elem.deleted).slice(from, to)
  }

  public length(): number {
    return this.emoji.length
  }

  public favLength(): number {
    return this.favCount
  }

  public delLength(): number {
    console.log(this.delCount)
    return this.delCount
  }

  public addToFavorite(emoji: Emoji): void {
    emoji.favorite = true
    this.favCount++
  }

  public removeFromFavorite(emoji: Emoji): void {
    delete emoji.favorite
    this.favCount--
  }

  public addToDeleted(emoji: Emoji): void {
    emoji.deleted = true
    this.delCount++
  }

  public removeFromDeleted(emoji: Emoji): void {
    delete emoji.deleted
    this.delCount--
  }
}
