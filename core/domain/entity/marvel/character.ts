// Ref.: https://developer.marvel.com/docs#!/public/getCreatorCollection_get_0

import { Comic } from "./comic";
import { MarvelEvent } from "./event";
import { Series } from "./series";
import { Story } from "./story";

export interface Character {
  id: number;
  name: string;
  description: string;
  resourceURI: string;
  thumbnail: string;
  urls: string[];
  comics: Comic[];
  stories: Story[];
  events: MarvelEvent[];
  series: Series[];
}