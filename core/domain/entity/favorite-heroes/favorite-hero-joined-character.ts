import { Character } from "../marvel/character";
import { FavoriteHero } from "./favorite-hero";

export interface FavoriteHeroJoinedCharacter
    extends FavoriteHero {
        
  character: Character;
}