import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get<ConfigService>(ConfigService);

  const logsDir = configService.get<string>('logDir');
  const logger = new LoggerService(logsDir);
  // 使用全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  const options = new DocumentBuilder()
    .setTitle('co-tool-server API')
    .addTag('co-tool-server')
    .setDescription('co-tool-server API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('PORT') || 7840;
  await app.listen(port);
  logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
