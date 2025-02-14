import { AuthService } from '../services/auth.service';
import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @UseGuards(AuthGuard('steam'))
  steamAuth() {}

  @Get('steam/return')
  @UseGuards(AuthGuard('steam'))
  async steamAuthCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    if (!user) {
      throw new HttpException('unknown login error', 500);
    }

    const token = await this.authService.getToken(user);

    return res.redirect(
      `${process.env.APP_URL}/auth/return?token=${token}`,
    );
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
