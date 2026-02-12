import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST',
    credentials: true,
  });
  
  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`Сервер запущен на порту ${port}`);
}
bootstrap();