import { Module } from '@nestjs/common';

import { ExamsController } from './controllers/exams/exams.controller';
import { GradesController } from './controllers/grades/grades.controller';
import { MarksController } from './controllers/marks/marks.controller';
import { ExamsService } from './services/exams/exams.service';
import { GradesService } from './services/grades/grades.service';
import { MarksService } from './services/marks/marks.service';

@Module({
  providers: [ExamsService, MarksService, GradesService],
  controllers: [ExamsController, MarksController, GradesController]})
export class ExaminationsModule {}
