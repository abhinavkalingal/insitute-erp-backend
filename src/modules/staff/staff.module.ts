import { StorageModule } from '@modules/storage/storage.module';
import { Module } from '@nestjs/common';

import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';

@Module({
  imports: [StorageModule],
  controllers: [StaffController],
  providers: [StaffService],
  exports: [StaffService]})
export class StaffModule {}
