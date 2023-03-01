import { Module } from '@nestjs/common';
import { EventLogService } from '@src/event-log/EventLog.service';

@Module({
  imports: [],
  controllers: [],
  providers: [EventLogService],
})
export class EventLogModule {}
