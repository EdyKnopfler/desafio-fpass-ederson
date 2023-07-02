import { FavoriteHero } from "../domain/entity/favorite-heroes/favorite-hero";
import { FavoriteHeroesRepository } from "../domain/repository/favorite-heroes.repository";
import { HeroNotFound } from "./hero-not-found.exception";
import { MarvelService } from "./marvel.service";

export class FavoriteHeroesService {
  private repository = new FavoriteHeroesRepository();
  private marvelService = new MarvelService();

  async save(favorited: FavoriteHero) {
    const hero = await this.marvelService.findById(favorited.marvelId);

    if (!hero) {
      throw new HeroNotFound(`Hero ID ${favorited.marvelId} not found`);
    }

    this.repository.save(favorited);
  }

  all(): FavoriteHero[] {
    return this.repository.all();
  }
}