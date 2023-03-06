import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MarketDataUpdateEvent } from '@src/commons/event/MarketDataUpdateEvent';
import { SubscribeMarketDataEvent } from '@src/commons/event/SubscribeMarketDataEvent';
import { DataStream } from '@src/commons/types';

@Injectable()
export abstract class BaseStrategy implements OnApplicationBootstrap {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  abstract getInitialDataStreamsToSubscribe(): DataStream[];

  abstract onMarketDataUpdate(event: MarketDataUpdateEvent): void;

  onApplicationBootstrap() {
    const initialDataSubs = this.getInitialDataStreamsToSubscribe();
    if (initialDataSubs.length) {
      this.subscribe(initialDataSubs);
    }
  }

  private subscribe(dataStreams: DataStream[]) {
    dataStreams.forEach(({ symbol, period }) => {
      this.eventEmitter.emit(
        SubscribeMarketDataEvent.name,
        new SubscribeMarketDataEvent(symbol, period),
      );
    });
  }
}
