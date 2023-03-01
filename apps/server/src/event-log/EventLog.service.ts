import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class EventLogService {
  private readonly logger = new Logger(EventLogService.name);

  @OnEvent('*')
  logAllEvents(event: unknown) {
    this.logger.debug(JSON.stringify(event, null, 2));
  }
}
