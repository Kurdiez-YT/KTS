import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { ConfigModule } from '@nestjs/config';
import { appConfig, typeOrmConfigs } from '@src/config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CliCommandModule } from '@src/cli-command/cli-command.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfigs),
    CliCommandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
