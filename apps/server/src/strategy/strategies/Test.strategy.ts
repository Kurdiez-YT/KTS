import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MarketDataPeriod } from '@src/commons/constant/MarketDataPeriod';
import { TradeSymbol } from '@src/commons/constant/TradeSymbol';
import { MarketDataUpdateEvent } from '@src/commons/event/MarketDataUpdateEvent';
import { DataStream } from '@src/commons/types';
import { BaseStrategy } from '@src/strategy/strategies/BaseStrategy';

@Injectable()
export class TestStrategy extends BaseStrategy {
  getInitialDataStreamsToSubscribe(): DataStream[] {
    return [
      {
        symbol: TradeSymbol.BTC_USDT,
        period: MarketDataPeriod.ONE_MINUTE,
      },
    ];
  }

  @OnEvent(MarketDataUpdateEvent.name)
  onMarketDataUpdate(event: MarketDataUpdateEvent) {
    console.log(
      '=== TestStrategy :: onMarketDataUpdateEvent :: event: ',
      event,
    );
  }
}
