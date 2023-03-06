import { MarketDataPeriod } from '@src/commons/constant/MarketDataPeriod';
import { TradeSymbol } from '@src/commons/constant/TradeSymbol';

export interface CandleData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type DataStream = {
  symbol: TradeSymbol;
  period: MarketDataPeriod;
};
