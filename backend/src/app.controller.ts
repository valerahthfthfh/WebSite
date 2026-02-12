import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('send-request')
  async sendRequest(@Body() data: any) {
    console.log('🚀 ПОСТУПИЛ ЗАПРОС НА /send-request');
    console.log('📦 Тело запроса:', data);
    return this.appService.handleRequest(data);
  }

  @Get('test')
  getTest() {
    console.log('✅ Тестовый запрос на /test');
    return { status: 'ok', message: 'Бэкенд работает' };
  }
}