import { Module } from '@nestjs/common';

import { FeaturesModule } from '../features/features.module';
import { ApiKeysController } from './controllers/api-keys/api-keys.controller';
import { ApiKeysService } from './services/api-keys/api-keys.service';

@Module({
  imports: [FeaturesModule],
  providers: [ApiKeysService],
  controllers: [ApiKeysController],
  exports: [ApiKeysService]})
export class ApiKeysModule {}
