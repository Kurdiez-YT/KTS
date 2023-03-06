import { Module } from '@nestjs/common';
import { TestStrategy } from '@src/strategy/strategies/Test.strategy';

@Module({
  imports: [],
  providers: [TestStrategy],
})
export class StrategyModule {}
