import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/App.module';
import { ConfigService } from '@nestjs/config';
import { LogLevel } from '@nestjs/common';

async function bootstrap() {
  const logLevels = (process.env.LOG_LEVELS?.split(',') || [
    'debug',
    'log',
    'warn',
    'error',
  ]) as LogLevel[];
  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('serverPort', 3000); // get the port number from the configuration, defaulting to 3000 if not defined
  await app.listen(port);
}
bootstrap();
