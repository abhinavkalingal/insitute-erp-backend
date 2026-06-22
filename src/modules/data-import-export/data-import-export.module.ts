import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infrastructure/database/database.module';

import { DataImportExportController } from './data-import-export.controller';
import { DataImportExportService } from './data-import-export.service';

@Module({
  imports: [DatabaseModule],
  controllers: [DataImportExportController],
  providers: [DataImportExportService],
  exports: [DataImportExportService]})
export class DataImportExportModule {}
