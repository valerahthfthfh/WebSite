import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('send-request')
  async sendRequest(@Body() data: any) {
    return this.appService.handleFullRequest(data);
  }

  @Post('send-phone')
  async sendPhone(@Body() data: any) {
    return this.appService.handlePhoneOnlyRequest(data);
  }

  @Get('test')
  getTest() {
    return { status: 'ok', message: 'Бэкенд работает' };
  }
}