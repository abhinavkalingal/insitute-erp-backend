import { Module } from '@nestjs/common';

import { EventCategoriesController } from './controllers/event-categories/event-categories.controller';
import { EventParticipantsController } from './controllers/event-participants/event-participants.controller';
import { EventsController } from './controllers/events/events.controller';
import { EventCategoriesService } from './services/event-categories/event-categories.service';
import { EventParticipantsService } from './services/event-participants/event-participants.service';
import { EventsService } from './services/events/events.service';

@Module({
  providers: [EventCategoriesService, EventsService, EventParticipantsService],
  controllers: [EventCategoriesController, EventsController, EventParticipantsController]})
export class EventsModule {}
