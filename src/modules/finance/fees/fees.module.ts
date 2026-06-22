import { Module } from '@nestjs/common';

import { FeeCategoriesController } from './controllers/fee-categories/fee-categories.controller';
import { FeeDiscountsController } from './controllers/fee-discounts/fee-discounts.controller';
import { FeeStructuresController } from './controllers/fee-structures/fee-structures.controller';
import { FineRulesController } from './controllers/fine-rules/fine-rules.controller';
import { StudentFeeAssignmentsController } from './controllers/student-fee-assignments/student-fee-assignments.controller';
import { FeeCategoriesService } from './services/fee-categories/fee-categories.service';
import { FeeDiscountsService } from './services/fee-discounts/fee-discounts.service';
import { FeeStructuresService } from './services/fee-structures/fee-structures.service';
import { FineRulesService } from './services/fine-rules/fine-rules.service';
import { StudentFeeAssignmentsService } from './services/student-fee-assignments/student-fee-assignments.service';

@Module({
  providers: [
    FeeCategoriesService,
    FeeStructuresService,
    FeeDiscountsService,
    FineRulesService,
    StudentFeeAssignmentsService,
  ],
  controllers: [
    FeeCategoriesController,
    FeeStructuresController,
    FeeDiscountsController,
    FineRulesController,
    StudentFeeAssignmentsController,
  ]})
export class FeesModule {}
