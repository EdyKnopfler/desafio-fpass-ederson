import { Controller, Get } from '@nestjs/common';
import { MarvelService } from '../../../../core/use-case/marvel.service';
import { Public } from '../authentication/public.decorator';

@Controller('heroes')
export class HeroesController {

  private service = new MarvelService();

  @Get()
  @Public()
  list() {
    return this.service.listHeroes();
  }

}