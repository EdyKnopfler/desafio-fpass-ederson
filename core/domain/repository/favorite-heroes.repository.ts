import { FavoriteHero } from "../entity/favorite-heroes/favorite-hero";

export class FavoriteHeroesRepository {
  private storage: {[marvelId: number]: FavoriteHero} = {};

  save(favorited: FavoriteHero) {
    this.storage[favorited.marvelId] = favorited;
  }

  delete(marvelId: number) {
    delete this.storage[marvelId];
  }

  all(): FavoriteHero[] {
    return Object.values(this.storage);
  }
}