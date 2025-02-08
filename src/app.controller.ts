import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { JwtAuthGuard } from './auth/guards/jwt.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: Request): string {
    return this.appService.getHello(req);
  }

  @Get('auth-test')
  @UseGuards(JwtAuthGuard)
  getAuthTest() {
    return 'Ok!!!';
  }
}
