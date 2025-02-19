import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Roles } from './auth/decorators/roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('auth-test')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('owner')
  getAuthTest() {
    return 'Ok!!!';
  }
}
