import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { jwtConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
  }))

  app.enableCors();

  app.use(cookieParser())

  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('Singular Test API')
    .setDescription('Singular Agency Backend Test API')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('product')
    .addBearerAuth()
    // .addCookieAuth(jwtConfig.cookieName)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
