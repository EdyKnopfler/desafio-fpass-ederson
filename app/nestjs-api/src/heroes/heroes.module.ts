import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { HeroesController } from "./heroes.controller";

@Module({
  imports: [HttpModule],
  controllers: [HeroesController]
})
export class HeroesModule {}