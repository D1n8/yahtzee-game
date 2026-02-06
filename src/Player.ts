export class Player {
  public name: string
  private score: number = 0

  constructor(name: string) {
    this.name = name
  }

  getScore() {
    return this.score
  }
}