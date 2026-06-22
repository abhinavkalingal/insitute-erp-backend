import { StorageModule } from '@modules/storage/storage.module';
import { Module } from '@nestjs/common';

import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [StorageModule],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService]})
export class StudentsModule {}
