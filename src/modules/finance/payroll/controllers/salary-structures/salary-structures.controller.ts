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
  CreateSalaryStructureDto,
  SalaryStructureQueryOptionsDto,
  UpdateSalaryStructureDto} from '../../dto/salary-structure.dto';
import { SalaryStructuresService } from '../../services/salary-structures/salary-structures.service';

@ApiTags('Finance / Payroll / Salary Structures')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('salary-structures')
export class SalaryStructuresController {
  constructor(private readonly salaryStructuresService: SalaryStructuresService) {}

  @Post()
  @RequirePermissions('create:finance')
  @ApiOperation({ summary: 'Create a new salary structure for a staff member' })
  create( @Body() createDto: CreateSalaryStructureDto) {
    return this.salaryStructuresService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get all salary structures' })
  @ApiPaginatedResponse(CreateSalaryStructureDto)
  findAll(
    
    @Query() queryOptions: SalaryStructureQueryOptionsDto,
  ) {
    return this.salaryStructuresService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get a specific salary structure by ID' })
  findOne( @Param('id') id: string) {
    return this.salaryStructuresService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:finance')
  @ApiOperation({ summary: 'Update a salary structure' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateSalaryStructureDto,
  ) {
    return this.salaryStructuresService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:finance')
  @ApiOperation({ summary: 'Delete a salary structure' })
  remove( @Param('id') id: string) {
    return this.salaryStructuresService.remove(id, );
  }
}
