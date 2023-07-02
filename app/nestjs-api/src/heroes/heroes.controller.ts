import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { MarvelService } from '../../../../core/use-case/marvel.service';
import { Public } from '../authentication/public.decorator';

@Controller('heroes')
export class HeroesController {

  private service = new MarvelService();

  @Get()
  @Public()
  list(
    @Query('search') search: string,
    @Query('page') page: number,
  ) {
    if (!search) {
      throw new BadRequestException('Missing a `search` query param');
    }
    return this.service.listHeroes(search, page);
  }

}