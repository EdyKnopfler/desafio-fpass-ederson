import * as crypto from 'crypto';
import axios from 'axios';

import { Character } from '../domain/entity/marvel/character';

export class MarvelService {

  private baseUrl = 'https://gateway.marvel.com/v1/public';
  private privateKey = process.env.MARVEL_PRIVATE_KEY;
  private publicKey = process.env.MARVEL_PUBLIC_KEY;

  async listHeroes(): Promise<Character[]> {
    const response = await axios.get(
      `${this.baseUrl}/characters`, this.defaultConfig());
    return response.data.data.results.map(this.transformPayload);
  }

  private makeTsAndHash() {
    const ts = crypto.randomBytes(20).toString('hex');
    const keys =  ts + this.privateKey + this.publicKey;
    const hash = crypto.createHash('md5').update(keys).digest('hex');
    return { ts, hash, apikey: this.publicKey };
  }

  private defaultConfig() {
    return {
      params: this.makeTsAndHash(),
      headers: { 'Accept-encoding': 'gzip' },
    };
  }

  private transformPayload(payload: any): Character {
    return {
      id: payload.id,
      name: payload.name,
      description: payload.description,
      resourceURI: payload.resourceURI,
      thumbnail: payload.thumbnail.path,
      urls: payload.urls.map((urlItem: any) => urlItem.url),
      comics: payload.comics.items,
      stories: payload.stories.items,
      events: payload.events.items,
      series: payload.events.series
    };
  }
}