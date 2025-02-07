import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VipController } from './vip/vip.controller';
import { VipService } from './vip/vip.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { SteamBotService } from './steam-bot/steam-bot.service';

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
