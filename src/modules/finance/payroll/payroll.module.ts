import { Module } from '@nestjs/common';

import { PayrollSlipsController } from './controllers/payroll-slips/payroll-slips.controller';
import { SalaryStructuresController } from './controllers/salary-structures/salary-structures.controller';
import { StaffLoansController } from './controllers/staff-loans/staff-loans.controller';
import { PayrollSlipsService } from './services/payroll-slips/payroll-slips.service';
import { SalaryStructuresService } from './services/salary-structures/salary-structures.service';
import { StaffLoansService } from './services/staff-loans/staff-loans.service';

@Module({
  providers: [SalaryStructuresService, StaffLoansService, PayrollSlipsService],
  controllers: [SalaryStructuresController, StaffLoansController, PayrollSlipsController]})
export class PayrollModule {}
