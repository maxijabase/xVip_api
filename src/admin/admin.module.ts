import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { AuthService } from 'src/auth/services/auth.service';
import { VipService } from 'src/vip/vip.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AdminController],
  providers: [AuthService, VipService, PrismaService, JwtService, AdminService],
})
export class AdminModule {}
