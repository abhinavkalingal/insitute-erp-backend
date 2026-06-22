import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { ApiPaginatedResponse } from '@core/utils/pagination/api-paginated-response.decorator';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AssignFeeDto, StudentFeeAssignmentQueryOptionsDto } from '../../dto/assign-fee.dto';
import { StudentFeeAssignmentsService } from '../../services/student-fee-assignments/student-fee-assignments.service';

@ApiTags('Finance / Student Fee Assignments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('student-fee-assignments')
export class StudentFeeAssignmentsController {
  constructor(private readonly studentFeeAssignmentsService: StudentFeeAssignmentsService) {}

  @Post()
  @RequirePermissions('create:finance')
  @ApiOperation({ summary: 'Assign a fee structure to a student (Generates Invoice)' })
  assignFee( @Body() assignDto: AssignFeeDto) {
    return this.studentFeeAssignmentsService.assignFee( assignDto);
  }

  @Get()
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get all fee assignments / invoices' })
  @ApiPaginatedResponse(AssignFeeDto)
  findAll(
    
    @Query() queryOptions: StudentFeeAssignmentQueryOptionsDto,
  ) {
    return this.studentFeeAssignmentsService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get a specific fee assignment / invoice by ID' })
  findOne( @Param('id') id: string) {
    return this.studentFeeAssignmentsService.findOne(id, );
  }
}
