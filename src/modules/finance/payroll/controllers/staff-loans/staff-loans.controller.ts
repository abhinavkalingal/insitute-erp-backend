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
  CreateStaffLoanDto,
  StaffLoanQueryOptionsDto,
  UpdateStaffLoanDto} from '../../dto/staff-loan.dto';
import { StaffLoansService } from '../../services/staff-loans/staff-loans.service';

@ApiTags('Finance / Payroll / Staff Loans')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('staff-loans')
export class StaffLoansController {
  constructor(private readonly staffLoansService: StaffLoansService) {}

  @Post()
  @RequirePermissions('create:finance')
  @ApiOperation({ summary: 'Issue a new loan to a staff member' })
  create( @Body() createDto: CreateStaffLoanDto) {
    return this.staffLoansService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get all staff loans' })
  @ApiPaginatedResponse(CreateStaffLoanDto)
  findAll(
    
    @Query() queryOptions: StaffLoanQueryOptionsDto,
  ) {
    return this.staffLoansService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get a specific staff loan by ID' })
  findOne( @Param('id') id: string) {
    return this.staffLoansService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:finance')
  @ApiOperation({ summary: 'Update a staff loan (e.g., mark PAID_OFF manually)' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateStaffLoanDto,
  ) {
    return this.staffLoansService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:finance')
  @ApiOperation({ summary: 'Delete a staff loan' })
  remove( @Param('id') id: string) {
    return this.staffLoansService.remove(id, );
  }
}
