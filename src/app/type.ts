export enum EmojiType {
  None, Favorite, Deleted
}

export class Emoji {
  public name: string
  public src: string
  public type: EmojiType

  constructor(name: string, src: string, type?: EmojiType) {
    this.name = name
    this.src = src
    this.type = type ? type : EmojiType.None
  }

  public deleted() {
    return this.type === EmojiType.Deleted
  }

  public favorite() {
    return this.type === EmojiType.Favorite
  }
}
