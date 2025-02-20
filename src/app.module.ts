import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VipController } from './vip/vip.controller';
import { VipService } from './vip/vip.service';
import { PrismaService } from './prisma/services/prisma.service';
import { AuthModule } from './auth/modules/auth.module';
import { SteamBotService } from './steam-bot/services/steam-bot.service';
import { VipModule } from './vip/vip.module';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { AdminService } from './admin/admin.service';

@Module({
  imports: [AuthModule, VipModule, AdminModule],
  controllers: [AppController, VipController, AdminController],
  providers: [AppService, VipService, AdminService, PrismaService, SteamBotService],
})
export class AppModule {}
