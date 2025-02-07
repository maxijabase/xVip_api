import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(AuthGuard('steam'))
  steamAuth() {
    // Passport will redirect to Steam
  }

  @Get('steam/return')
  @UseGuards(AuthGuard('steam'))
  steamAuthCallback(@Req() req) {
    // Handle the callback after Steam authentication
    return req.user;
  }
}