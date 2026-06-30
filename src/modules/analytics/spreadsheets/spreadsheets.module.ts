import { Module } from '@nestjs/common';
import { SpreadsheetsService } from './spreadsheets.service';
import { SpreadsheetsController } from './spreadsheets.controller';
import { PrismaService } from '@infrastructure/database/prisma.service';

@Module({
  controllers: [SpreadsheetsController],
  providers: [SpreadsheetsService, PrismaService],
  exports: [SpreadsheetsService],
})
export class SpreadsheetsModule {}
