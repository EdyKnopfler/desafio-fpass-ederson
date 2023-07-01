import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import '@js-joda/timezone';

import { sayHello } from '../../../core/use-case/example';

console.log(sayHello());

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
