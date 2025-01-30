import './config/aliases';
import { NestFactory } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.ORIGIN || 'http://localhost:3000',
      credentials: true,
    },
  });

  let cookie: session.CookieOptions = {
    maxAge: 24 * 60 * 60 * 1000, // 24hrs
  };
  if (process.env.NODE_ENV === 'production') {
    cookie = {
      ...cookie,
      sameSite: 'none',
      secure: true,
      domain: process.env.ORIGIN,
    };
  }

  app.use(
    session({
      cookie,
      secret: 'datawow-backend-secret-placeholder',
      resave: false,
      saveUninitialized: false,
      store: new PrismaSessionStore(new PrismaClient(), {
        checkPeriod: 60 * 60 * 1000, // 1hr
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
