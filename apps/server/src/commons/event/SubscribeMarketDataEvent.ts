import { MarketDataPeriod } from '@src/commons/constant/MarketDataPeriod';
import { TradeSymbol } from '@src/commons/constant/TradeSymbol';

export class SubscribeMarketDataEvent {
  constructor(
    public readonly symbol: TradeSymbol,
    public readonly period: MarketDataPeriod,
  ) {
    Object.freeze(this);
  }
}
