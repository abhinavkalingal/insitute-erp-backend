import { Module } from '@nestjs/common';
import { TelecallerController } from './telecaller.controller';
import { TelecallerService } from './telecaller.service';

@Module({
  controllers: [TelecallerController],
  providers: [TelecallerService]
})
export class TelecallerModule {}
