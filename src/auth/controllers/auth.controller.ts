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
  steamAuth(@Req() req: Request) {}

  @Get('return')
  @UseGuards(AuthGuard('steam'))
  async steamAuthCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    if (!user) {
      throw new HttpException('unknown login error', 500);
    }

    const token = await this.authService.getToken(user);
    return res.redirect(`${process.env.APP_URL}/auth/return?token=${token}`);
  }

  @Get('verifyToken')
  async verifyToken(@Req() req: Request) {
    const token = req.query.token as string;
    if (!token) {
      throw new HttpException('token is required', 400);
    }
    return await this.authService.verifyToken(token);
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.redirect('/');
  }
}
