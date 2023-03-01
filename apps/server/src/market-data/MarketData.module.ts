import { Module } from '@nestjs/common';
import { MarketDataService } from '@src/market-data/MarketData.service';
import { BinanceProvider } from '@src/market-data/providers/Binance';

@Module({
  imports: [],
  controllers: [],
  providers: [MarketDataService, BinanceProvider],
})
export class MarketDataModule {}
