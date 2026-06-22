import { Module } from '@nestjs/common';

import { AssignmentsController } from './controllers/assignments/assignments.controller';
import { SubmissionsController } from './controllers/submissions/submissions.controller';
import { AssignmentsService } from './services/assignments/assignments.service';
import { SubmissionsService } from './services/submissions/submissions.service';

@Module({
  providers: [AssignmentsService, SubmissionsService],
  controllers: [AssignmentsController, SubmissionsController]})
export class AssignmentsModule {}
