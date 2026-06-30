import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationsController } from './operations.controller';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { IdCardsModule } from './id-cards/id-cards.module';

@Module({
  imports: [IdCardsModule],
  controllers: [OperationsController],
  providers: [OperationsService, PrismaService],
  exports: [OperationsService],
})
export class OperationsModule {}
