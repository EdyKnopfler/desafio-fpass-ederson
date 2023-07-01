import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { HeroesModule } from './heroes/heroes.module';

@Module({
  imports: [AuthenticationModule, HeroesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
