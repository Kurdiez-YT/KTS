import { LogLevel } from '@nestjs/common';
import { CommandFactory } from 'nest-commander';
import { AppModule } from '@src/app.module';

async function bootstrap() {
  const logLevels = (process.env.LOG_LEVELS?.split(',') || [
    'debug',
    'log',
    'warn',
    'error',
  ]) as LogLevel[];
  await CommandFactory.run(AppModule, {
    logger: logLevels,
  });
  process.exit(0);
}

void bootstrap();
