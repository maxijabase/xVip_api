import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/modules/auth.module';
import { AuthService } from 'src/auth/services/auth.service';
import { VipController } from './vip.controller';
import { VipService } from './vip.service';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule],
  providers: [AuthService, VipService, PrismaService, JwtService],
  controllers: [VipController],
  exports: [],
})
export class VipModule {}
