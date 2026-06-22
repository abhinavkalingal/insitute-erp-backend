import { Module } from '@nestjs/common';

import { ExpenseCategoriesController } from './controllers/expense-categories/expense-categories.controller';
import { ExpensesController } from './controllers/expenses/expenses.controller';
import { VendorsController } from './controllers/vendors/vendors.controller';
import { ExpenseCategoriesService } from './services/expense-categories/expense-categories.service';
import { ExpensesService } from './services/expenses/expenses.service';
import { VendorsService } from './services/vendors/vendors.service';

@Module({
  providers: [VendorsService, ExpenseCategoriesService, ExpensesService],
  controllers: [VendorsController, ExpenseCategoriesController, ExpensesController]})
export class ExpensesModule {}
