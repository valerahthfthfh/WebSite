import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Настройка CORS для работы с фронтендом
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://kotloff-frontend.onrender.com',
      'https://kotloff-frontend.onrender.com', // без слеша тоже
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });
  
  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`🚀 Бэкенд запущен на порту ${port}`);
  console.log('✅ CORS разрешен для:');
  console.log('   - http://localhost:3000');
  console.log('   - https://kotloff-frontend.onrender.com');
}
bootstrap();