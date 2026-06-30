import { Module } from '@nestjs/common';
import { IdCardsService } from './id-cards.service';
import { IdCardsController } from './id-cards.controller';
import { PrismaService } from '@infrastructure/database/prisma.service';

@Module({
  controllers: [IdCardsController],
  providers: [IdCardsService, PrismaService],
  exports: [IdCardsService],
})
export class IdCardsModule {}
