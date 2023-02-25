import { Module } from '@nestjs/common';
import { SeedDataCmd } from '@src/cli-command/data/seed/seed-data.cmd';
import { ExampleCmd } from '@src/cli-command/example.cmd';

@Module({
  imports: [],
  providers: [ExampleCmd, SeedDataCmd],
})
export class CliCommandModule {}
