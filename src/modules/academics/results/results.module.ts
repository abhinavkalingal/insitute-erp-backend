import { Module } from '@nestjs/common';

import { ResultsController } from './controllers/results/results.controller';
import { ResultsService } from './services/results/results.service';

@Module({
  providers: [ResultsService],
  controllers: [ResultsController]})
export class ResultsModule {}
