import { NestFactory } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import session from 'express-session';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24hrs
      },
      secret: 'datawow-backend-secret-placeholder',
      resave: true,
      saveUninitialized: true,
      store: new PrismaSessionStore(new PrismaClient(), {
        checkPeriod: 60 * 60 * 1000, // 1hr
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
