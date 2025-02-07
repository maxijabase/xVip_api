import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SteamStrategy } from './steam.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule],
  providers: [SteamStrategy],
  controllers: [AuthController]
})
export class AuthModule {}