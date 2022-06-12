import { Controller, Post, Body, Get} from '@nestjs/common';
import { publishDto } from 'dtos/publishMessage';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
  
  @Post('messages')
  publishMessage(@Body() publishDto: publishDto) {
    this.appService.publishMessage(publishDto)
  }
}
