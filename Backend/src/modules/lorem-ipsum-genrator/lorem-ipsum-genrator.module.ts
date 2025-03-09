import { Module } from '@nestjs/common';
import { LoremIpsumGenratorService } from './lorem-ipsum-genrator.service';
import { LoremIpsumGenratorController } from './lorem-ipsum-genrator.controller';

@Module({
  providers: [LoremIpsumGenratorService],
  controllers: [LoremIpsumGenratorController]
})
export class LoremIpsumGenratorModule {}
