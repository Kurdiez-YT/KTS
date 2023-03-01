import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as ccxt from 'ccxt';
import { runWithRetry } from '@src/commons/util/runWithRetry';
import { MarketDataService } from '@src/market-data/MarketData.service';
import { TradeSymbol } from '@src/commons/constant/TradeSymbol';
import {
  MarketDataPeriod,
  numMinutes,
} from '@src/commons/constant/MarketDataPeriod';
import { Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MarketDataUpdateEvent } from '@src/commons/event/MarketDataUpdateEvent';

// TODO: for now we only care about BTC/USDT. More should be added later.
const oneMinMarketDataIds = [
  `${TradeSymbol.BTC_USDT}||${MarketDataPeriod.ONE_MINUTE}`,
];

@Injectable()
export class BinanceProvider {
  private readonly logger = new Logger(BinanceProvider.name);
  private readonly exchange = new ccxt.binance();

  constructor(
    private readonly marketDataService: MarketDataService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Cron('* * * * *')
  async fetchAndPublishOneMin() {
    for (const marketDataId of oneMinMarketDataIds) {
      const subscription =
        this.marketDataService.subscribedMarketDataIds[marketDataId];

      if (!subscription) continue;
      const { symbol, period } = subscription;

      try {
        const [timestamp, open, high, low, close, volume] =
          await this.fetchMarketData(symbol, period);
        this.eventEmitter.emit(
          MarketDataUpdateEvent.name,
          new MarketDataUpdateEvent(symbol, period, {
            timestamp,
            open,
            high,
            low,
            close,
            volume,
          }),
        );
      } catch (error) {
        // publish an error event
        this.logger.error(
          `Failed fetching and publishing market data for ${marketDataId}`,
          error,
        );
      }
    }
  }

  private async fetchMarketData(symbol: TradeSymbol, period: MarketDataPeriod) {
    return await runWithRetry(async () => {
      const lastMinute = new Date();
      lastMinute.setSeconds(0);
      lastMinute.setMilliseconds(0);
      const expectedCloseTime = lastMinute.getTime();
      const expectedOpenTime = expectedCloseTime - numMinutes(period);

      const fetchedData = await this.exchange.fetchOHLCV(
        symbol,
        period,
        expectedOpenTime,
      );
      const lastMinCandle = fetchedData[0];
      const lastMinCandleOpenTime = lastMinCandle[0];
      const lastMinCandleCloseTime = lastMinCandle[0] + numMinutes(period);

      if (
        lastMinCandleOpenTime === expectedOpenTime &&
        lastMinCandleCloseTime === expectedCloseTime
      ) {
        return lastMinCandle;
      }
      throw new Error(
        `Fetched data is not for the right timestamp: ${JSON.stringify(
          fetchedData,
        )}`,
      );
    });
  }
}
