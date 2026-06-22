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
  AssignmentQueryOptionsDto,
  CreateAssignmentDto,
  UpdateAssignmentDto} from '../../dto/assignment.dto';
import { AssignmentsService } from '../../services/assignments/assignments.service';

@ApiTags('Academics / Assignments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  @RequirePermissions('create:academics')
  @ApiOperation({ summary: 'Create a new assignment' })
  create( @Body() createDto: CreateAssignmentDto) {
    const { staffId, ...rest } = createDto;
    return this.assignmentsService.create( staffId, rest as any);
  }

  @Get()
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get all assignments with pagination' })
  @ApiPaginatedResponse(CreateAssignmentDto)
  findAll(
    
    @Query() queryOptions: AssignmentQueryOptionsDto,
  ) {
    return this.assignmentsService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get assignment by ID' })
  findOne( @Param('id') id: string) {
    return this.assignmentsService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:academics')
  @ApiOperation({ summary: 'Update an assignment' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateAssignmentDto,
  ) {
    return this.assignmentsService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:academics')
  @ApiOperation({ summary: 'Soft delete an assignment' })
  remove( @Param('id') id: string) {
    return this.assignmentsService.remove(id, );
  }
}
