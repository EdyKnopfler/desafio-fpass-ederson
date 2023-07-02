import * as crypto from 'crypto';
import axios from 'axios';

export class MarvelService {

  private baseUrl = 'https://gateway.marvel.com/v1/public';
  private privateKey = process.env.MARVEL_PRIVATE_KEY;
  private publicKey = process.env.MARVEL_PUBLIC_KEY;

  async listHeroes() {
    const response = await axios.get(
      `${this.baseUrl}/characters`, this.defaultConfig());
    return response.data.data.results;
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
}