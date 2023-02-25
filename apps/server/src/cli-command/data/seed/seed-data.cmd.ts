import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';

@Command({ name: 'seed-data' })
export class SeedDataCmd extends CommandRunner {
  private readonly logger = new Logger(SeedDataCmd.name);

  async run(): Promise<void> {
    this.logger.log('=== seed-data :: run :: entered');
  }
}
