import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';
import { MemoryStore } from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  let sessionStore;
  
  if (process.env.NODE_ENV === 'production') {
    let redisClient = createClient();
    await redisClient.connect()
      .then(() => console.log('Connected to Redis'))
      .catch(console.error);

    sessionStore = new RedisStore({
      client: redisClient,
      prefix: "xvip:",
    });
  } else {
    sessionStore = new MemoryStore();
    console.log('Using in-memory session store for development');
  }

  app.use(
    session({
      store: sessionStore,
      secret: process.env.SESSION_SECRET ?? 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      }
    })
  );

  const config = new DocumentBuilder()
    .setTitle('xVip API')
    .setDescription('API specification for xVip')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
