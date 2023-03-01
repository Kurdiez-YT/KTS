import { MarketDataPeriod } from '@src/commons/constant/MarketDataPeriod';
import { TradeSymbol } from '@src/commons/constant/TradeSymbol';
import { CandleData } from '@src/commons/types';

export class MarketDataUpdateEvent {
  constructor(
    public readonly symbol: TradeSymbol,
    public readonly period: MarketDataPeriod,
    public readonly candle: CandleData,
  ) {
    Object.freeze(this);
  }
}
