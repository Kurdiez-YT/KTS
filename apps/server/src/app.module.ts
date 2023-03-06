import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, typeOrmConfigs } from '@src/config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CliCommandModule } from '@src/cli-command/cli-command.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { MarketDataModule } from '@src/market-data/MarketData.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EventLogModule } from '@src/event-log/EventLog.module';
import { StrategyModule } from '@src/strategy/strategy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfigs),
    EventEmitterModule.forRoot({
      wildcard: true,
      maxListeners: 1000,
    }),
    ScheduleModule.forRoot(),
    CliCommandModule,
    MarketDataModule,
    EventLogModule,
    StrategyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
