import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VipController } from './vip/controllers/vip.controller';
import { VipService } from './vip/services/vip.service';
import { PrismaService } from './prisma/services/prisma.service';
import { AuthModule } from './auth/modules/auth.module';
import { SteamBotService } from './steam-bot/services/steam-bot.service';
import { VipModule } from './vip/modules/vip.module';

@Module({
  imports: [AuthModule, VipModule],
  controllers: [AppController, VipController],
  providers: [AppService, VipService, PrismaService, SteamBotService],
})
export class AppModule /* implements NestModule */ {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes(VipController); // Apply middleware to specific routes
  // }
}
