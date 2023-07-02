import { BadRequestException, Body, Controller, Get, NotFoundException, Post, Query } from '@nestjs/common';

import { Public } from '../authentication/public.decorator';

import { MarvelService } from '../../../../core/use-case/marvel.service';
import { FavoriteHeroesService } from '../../../../core/use-case/favorite-heroes.service';
import { Character } from '../../../../core/domain/entity/marvel/character';
import { FavoriteHero } from '../../../../core/domain/entity/favorite-heroes/favorite-hero';
import { HeroNotFound } from '../../../../core/use-case/hero-not-found.exception';

@Controller('heroes')
export class HeroesController {

  private marvelService = new MarvelService();
  private favoriteService = new FavoriteHeroesService();

  @Get()
  @Public()
  searchHeroes(
    @Query('search') search: string,
    @Query('page') page: number,
  ): Promise<Character[]> {
    if (!search) {
      throw new BadRequestException('Missing a `search` query param');
    }
    return this.marvelService.listHeroes(search, page);
  }

  @Post('favorites')
  async markAsFavorite(@Body() favorited: FavoriteHero) {
    try {
      await this.favoriteService.save(favorited);
    } catch (error) {
      console.log('ERRO', error)
      if (error instanceof HeroNotFound) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get('favorites')
  @Public()
  listFavorites() {
    return this.favoriteService.all();
  }

}