import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { DatabaseModule } from '@infrastructure/database/database.module';

import { SpreadsheetsModule } from './spreadsheets/spreadsheets.module';

@Module({
  imports: [DatabaseModule, SpreadsheetsModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService]})
export class AnalyticsModule {}
