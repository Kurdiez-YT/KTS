import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MarketDataPeriod } from '@src/commons/constant/MarketDataPeriod';
import { TradeSymbol } from '@src/commons/constant/TradeSymbol';
import { SubscribeMarketDataEvent } from '@src/commons/event/SubscribeMarketDataEvent';

type SubscribedMarketData = {
  [marketDataId: string]: {
    symbol: TradeSymbol;
    period: MarketDataPeriod;
  };
};

@Injectable()
export class MarketDataService {
  get subscribedMarketDataIds() {
    return this._subscribedMarketData;
  }
  private readonly _subscribedMarketData: SubscribedMarketData = {};

  constructor() {
    // TODO: we pretend some strategy is already subscribing to "BTC/USDT" for "1m".
    // This should be later removed.
    const marketDataId = `${TradeSymbol.BTC_USDT}||${MarketDataPeriod.ONE_MINUTE}`;
    this._subscribedMarketData[marketDataId] = {
      symbol: TradeSymbol.BTC_USDT,
      period: MarketDataPeriod.ONE_MINUTE,
    };
  }

  @OnEvent(SubscribeMarketDataEvent.name)
  onSubscribeMarketData(event: SubscribeMarketDataEvent) {
    const marketDataId = `${event.symbol}||${event.period}`;
    this._subscribedMarketData[marketDataId] = {
      symbol: event.symbol,
      period: event.period,
    };
  }
}
