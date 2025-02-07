import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(AuthGuard('steam'))
  steamAuth() {}

  @Get('steam/return')
  @UseGuards(AuthGuard('steam'))
  steamAuthCallback(@Req() req: Request, @Res() res: Response) {
    req.session.user = req.user;
    res.redirect('/auth/user');
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.user = null;
    res.redirect('/');
  }

  @Get('user')
  getUser(@Req() req: Request) {
    return {
      user: req.session.user,
    };
  }
}
