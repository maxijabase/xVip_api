import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-steam';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      returnURL: 'http://localhost:3000/auth/return',
      realm: 'http://localhost:3000/',
      apiKey: process.env.STEAM_API_KEY,
    });
  }

  async validate(identifier: string, profile: any) {
    let role = await this.prisma.xVip_web_admins.findUnique({
      where: {
        steamid: profile.id,
      },
      include: {
        xVip_web_roles: true,
      },
    });

    let user = {
      ...profile._json,
      role: role ? role.xVip_web_roles.role_name : 'user',
    };
    return user;
  }
}
