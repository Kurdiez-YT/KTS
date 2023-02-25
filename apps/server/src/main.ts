import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('serverPort', 3000); // get the port number from the configuration, defaulting to 3000 if not defined
  await app.listen(port);
}
bootstrap();
