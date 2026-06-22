import { Module } from '@nestjs/common';

import { IdCardTemplatesController } from './controllers/id-card-templates/id-card-templates.controller';
import { IssuedIdCardsController } from './controllers/issued-id-cards/issued-id-cards.controller';
import { IdCardTemplatesService } from './services/id-card-templates/id-card-templates.service';
import { IssuedIdCardsService } from './services/issued-id-cards/issued-id-cards.service';

@Module({
  providers: [IdCardTemplatesService, IssuedIdCardsService],
  controllers: [IdCardTemplatesController, IssuedIdCardsController]})
export class IdCardsModule {}
