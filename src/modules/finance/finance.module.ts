import { Module } from '@nestjs/common';

import { FeesController } from './controllers/fees/fees.controller';
import { InvoicesController } from './controllers/invoices/invoices.controller';
import { PaymentsController } from './controllers/payments/payments.controller';
import { ExpensesModule } from './expenses/expenses.module';
import { FeesModule } from './fees/fees.module';
import { PaymentsModule } from './payments/payments.module';
import { PayrollModule } from './payroll/payroll.module';
import { FeesService } from './services/fees/fees.service';
import { InvoicesService } from './services/invoices/invoices.service';
import { PaymentsService } from './services/payments/payments.service';

@Module({
  providers: [FeesService, InvoicesService, PaymentsService],
  controllers: [FeesController, InvoicesController, PaymentsController],
  imports: [FeesModule, PaymentsModule, ExpensesModule, PayrollModule]})
export class FinanceModule {}
