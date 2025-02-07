import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SteamStrategy } from '../strategies/steam.strategy';
import { AuthController } from '../controllers/auth.controller';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { AuthService } from '../services/auth.service';

@Module({
  imports: [PassportModule],
  providers: [SteamStrategy, PrismaService, AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}