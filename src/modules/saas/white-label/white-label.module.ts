import { Module } from '@nestjs/common';

import { FeaturesModule } from '../features/features.module';
import { WhiteLabelController } from './controllers/white-label/white-label.controller';
import { WhiteLabelService } from './services/white-label/white-label.service';

@Module({
  imports: [FeaturesModule],
  providers: [WhiteLabelService],
  controllers: [WhiteLabelController],
  exports: [WhiteLabelService]})
export class WhiteLabelModule {}
