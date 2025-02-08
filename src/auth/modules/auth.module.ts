import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SteamStrategy } from '../strategies/steam.strategy';
import { AuthController } from '../controllers/auth.controller';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { AuthService } from '../services/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
  imports: [PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '72h' },
    })
  ],
  providers: [SteamStrategy, PrismaService, AuthService, JwtService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}