import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session ({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 10800000
      }
    }),
  );
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PATCH,POST,DELETE',​
    credentials: true,
  });

  await app.listen(8000);
}
bootstrap();
