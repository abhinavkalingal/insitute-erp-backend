import { StorageModule } from '@modules/storage/storage.module';
import { Module } from '@nestjs/common';

import { InstitutesController } from './institutes.controller';
import { InstitutesService } from './institutes.service';

@Module({
  imports: [StorageModule],
  controllers: [InstitutesController],
  providers: [InstitutesService],
  exports: [InstitutesService]})
export class InstitutesModule {}
