import { Module } from '@nestjs/common';

import { FeaturesModule } from '../saas/features/features.module';
import { BranchesController } from './branches.controller';
import { BranchesService } from './branches.service';

@Module({
  imports: [FeaturesModule],
  controllers: [BranchesController],
  providers: [BranchesService],
  exports: [BranchesService]})
export class BranchesModule {}
