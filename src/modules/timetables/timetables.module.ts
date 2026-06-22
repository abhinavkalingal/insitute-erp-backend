import { Module } from '@nestjs/common';

import { RoomsController } from './controllers/rooms/rooms.controller';
import { TimetablesController } from './controllers/timetables/timetables.controller';
import { RoomsService } from './services/rooms/rooms.service';
import { TimetablesService } from './services/timetables/timetables.service';

@Module({
  providers: [RoomsService, TimetablesService],
  controllers: [RoomsController, TimetablesController]})
export class TimetablesModule {}
