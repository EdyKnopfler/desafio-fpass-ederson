import { FavoriteHero } from "../domain/entity/favorite-heroes/favorite-hero";
import { FavoriteHeroJoinedCharacter } from "../domain/entity/favorite-heroes/favorite-hero-joined-character";
import { Character } from "../domain/entity/marvel/character";
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

  async all(): Promise<FavoriteHeroJoinedCharacter[]> {
    return await Promise.all(this.repository.all().map(
      async (favorited: FavoriteHero) => {
        const character = await this.marvelService.findById(favorited.marvelId);
        return {
          ...favorited,
          character: <Character>character
        };
      }
    ));
  }
}