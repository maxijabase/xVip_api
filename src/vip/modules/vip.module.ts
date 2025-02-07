import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/modules/auth.module';
import { AuthService } from 'src/auth/services/auth.service';
import { VipController } from '../controllers/vip.controller';
import { VipService } from '../services/vip.service';
import { PrismaService } from 'src/prisma/services/prisma.service';

@Module({
  imports: [AuthModule],
  providers: [AuthService, VipService, PrismaService],
  controllers: [VipController],
  exports: []
})
export class VipModule {}
