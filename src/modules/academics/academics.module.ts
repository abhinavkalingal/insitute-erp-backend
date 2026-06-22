import { Module } from '@nestjs/common';

import { AssignmentsModule } from './assignments/assignments.module';
import { CertificatesModule } from './certificates/certificates.module';
import { AcademicYearsController } from './controllers/academic-years/academic-years.controller';
import { BatchesController } from './controllers/batches/batches.controller';
import { CoursesController } from './controllers/courses/courses.controller';
import { SubjectsController } from './controllers/subjects/subjects.controller';
import { ExaminationsModule } from './examinations/examinations.module';
import { IdCardsModule } from './id-cards/id-cards.module';
import { MaterialsModule } from './materials/materials.module';
import { ResultsModule } from './results/results.module';
import { AcademicYearsService } from './services/academic-years/academic-years.service';
import { BatchesService } from './services/batches/batches.service';
import { CoursesService } from './services/courses/courses.service';
import { SubjectsService } from './services/subjects/subjects.service';

@Module({
  providers: [CoursesService, BatchesService, SubjectsService, AcademicYearsService],
  controllers: [CoursesController, BatchesController, SubjectsController, AcademicYearsController],
  imports: [
    AssignmentsModule,
    MaterialsModule,
    ExaminationsModule,
    ResultsModule,
    CertificatesModule,
    IdCardsModule,
  ]})
export class AcademicsModule {}
