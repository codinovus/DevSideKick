import { Module } from '@nestjs/common';
import { JwtDecoderService } from './jwt-decoder.service';
import { JwtDecoderController } from './jwt-decoder.controller';

@Module({
  providers: [JwtDecoderService],
  controllers: [JwtDecoderController]
})
export class JwtDecoderModule {}
