import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WebUser } from '../models/webUser';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async getToken(user: WebUser) {
    return this.jwtService.sign(user, {
      privateKey: process.env.JWT_SECRET,
      expiresIn: '72h',
    });
  }
}
