import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SteamStrategy } from '../strategies/steam.strategy';
import { AuthController } from '../controllers/auth.controller';

@Module({
  imports: [PassportModule],
  providers: [SteamStrategy],
  controllers: [AuthController]
})
export class AuthModule {}