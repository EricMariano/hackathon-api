import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove do body property que nao exista no DTO
    forbidNonWhitelisted: true, // retorna 400 se mandar campo extra
    transform: true, // converte query/param para o tipo esperado (ex: string → number)
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
