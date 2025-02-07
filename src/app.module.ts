import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VipController } from './vip/controllers/vip.controller';
import { VipService } from './vip/services/vip.service';
import { PrismaService } from './prisma/services/prisma.service';
import { AuthModule } from './auth/modules/auth.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { SteamBotService } from './steam-bot/services/steam-bot.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController, VipController],
  providers: [AppService, VipService, PrismaService, SteamBotService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(VipController); // Apply middleware to specific routes
  }
}
