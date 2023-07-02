export class HeroNotFound {
  constructor (
    private _message: string
  ) {}

  get message() {
    return this._message;
  }
}