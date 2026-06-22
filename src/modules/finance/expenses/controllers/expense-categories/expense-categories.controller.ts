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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  CreateExpenseCategoryDto,
  ExpenseCategoryQueryOptionsDto,
  UpdateExpenseCategoryDto} from '../../dto/expense-category.dto';
import { ExpenseCategoriesService } from '../../services/expense-categories/expense-categories.service';

@ApiTags('Finance / Expense Categories')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('expense-categories')
export class ExpenseCategoriesController {
  constructor(private readonly expenseCategoriesService: ExpenseCategoriesService) {}

  @Post()
  @RequirePermissions('create:finance')
  @ApiOperation({ summary: 'Create a new expense category' })
  create( @Body() createDto: CreateExpenseCategoryDto) {
    return this.expenseCategoriesService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get all expense categories' })
  @ApiPaginatedResponse(CreateExpenseCategoryDto)
  findAll(
    
    @Query() queryOptions: ExpenseCategoryQueryOptionsDto,
  ) {
    return this.expenseCategoriesService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get a specific expense category by ID' })
  findOne( @Param('id') id: string) {
    return this.expenseCategoriesService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:finance')
  @ApiOperation({ summary: 'Update an expense category' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateExpenseCategoryDto,
  ) {
    return this.expenseCategoriesService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:finance')
  @ApiOperation({ summary: 'Delete an expense category' })
  remove( @Param('id') id: string) {
    return this.expenseCategoriesService.remove(id, );
  }
}
