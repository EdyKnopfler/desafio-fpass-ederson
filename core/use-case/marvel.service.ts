import * as crypto from 'crypto';
import axios from 'axios';

import { Character } from '../domain/entity/marvel/character';

const PAGE_SIZE = 30;

export class MarvelService {

  private baseUrl = 'https://gateway.marvel.com/v1/public';
  private privateKey = process.env.MARVEL_PRIVATE_KEY;
  private publicKey = process.env.MARVEL_PUBLIC_KEY;

  async listHeroes(search: string, page: number): Promise<Character[]> {
    page = (page || 1) - 1;
    
    const config = this.defaultConfig();
    config.params.nameStartsWith = search;
    config.params.limit = PAGE_SIZE;
    config.params.offset = page * PAGE_SIZE;

    const response = await axios.get(
      `${this.baseUrl}/characters`, config);
    
    return response.data.data.results.map(this.transformPayload);
  }

  async findById(marvelId: number): Promise<Character | null> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/characters/${marvelId}`,
        this.defaultConfig()
      );

      if (response.data.code == 200) {
        return this.transformPayload(response.data.data.results[0])
      }

      return null;
    } catch (error) {
      if (error.response.status == 404) {
        return null;
      }

      throw error;
    }
  }

  private makeTsAndHash(): any {
    const ts = crypto.randomBytes(20).toString('hex');
    const keys =  ts + this.privateKey + this.publicKey;
    const hash = crypto.createHash('md5').update(keys).digest('hex');
    return { ts, hash, apikey: this.publicKey };
  }

  private defaultConfig(): any {
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