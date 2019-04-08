export class Emoji {
  public name: string
  public src: string
  public favorite?: boolean
  public deleted?: boolean

  constructor(name: string, src: string, favorite?: boolean, deleted?: boolean) {
    this.name = name
    this.src = src
    this.favorite = favorite
    this.deleted = deleted
  }

  public set(field: string, state: any) {
    switch (field) {
      case 'favorite':
        this.favorite = state
        break
      case 'deleted':
        this.favorite = false
        this.deleted = state
        break
      default:
        throw Error(`Undefined field: ${field}`)
    }
  }
}