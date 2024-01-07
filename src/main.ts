import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';
import { LoggerServiceWinston } from './common/helpers/LoggerServiceWinston';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //app.useGlobalInterceptors(new LoggerInterceptor(new LoggerServiceWinston));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({});
  const config = new DocumentBuilder()
    .setTitle('BackEnd Advertisement Billboard')
    .setDescription('The Advertisement Billboard API description')
    .setVersion('2.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads', // Tiền tố URL, ví dụ: /uploads/filename.jpg
  });
  app.useStaticAssets(join(__dirname, '..', 'src', 'templates'), {
    prefix: '/templates', // Tiền tố URL, ví dụ: /public/filename.jpg
  });
  await app.listen(4000);
}
bootstrap();
