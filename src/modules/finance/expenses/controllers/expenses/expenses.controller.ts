import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { ApiPaginatedResponse } from '@core/utils/pagination/api-paginated-response.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { CreateExpenseDto, ExpenseQueryOptionsDto, UpdateExpenseDto } from '../../dto/expense.dto';
import { ExpensesService } from '../../services/expenses/expenses.service';

@ApiTags('Finance / Expenses')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @RequirePermissions('create:finance')
  @ApiOperation({ summary: 'Log a new expense' })
  create( @Body() createDto: CreateExpenseDto) {
    return this.expensesService.create( createDto);
  }

  @Get('report')
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get an aggregated expense report' })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  getReport(
    
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.expensesService.getReport( startDate, endDate);
  }

  @Get()
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get all expenses' })
  @ApiPaginatedResponse(CreateExpenseDto)
  findAll( @Query() queryOptions: ExpenseQueryOptionsDto) {
    return this.expensesService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get a specific expense by ID' })
  findOne( @Param('id') id: string) {
    return this.expensesService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:finance')
  @ApiOperation({
    summary: 'Update an expense (e.g., change status to APPROVED/PAID or attach bill)'})
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateExpenseDto,
  ) {
    return this.expensesService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:finance')
  @ApiOperation({ summary: 'Delete an expense' })
  remove( @Param('id') id: string) {
    return this.expensesService.remove(id, );
  }
}
