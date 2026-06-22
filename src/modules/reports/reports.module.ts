import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { ReportsController } from './reports.controller';
import { ReportsService } from './services/reports.service';
import { ExportService } from './services/export.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ReportsController],
  providers: [ReportsService, ExportService],
  exports: [ReportsService, ExportService]})
export class ReportsModule {}
