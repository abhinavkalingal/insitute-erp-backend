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
  CreateGradeRuleDto,
  GradeRuleQueryOptionsDto,
  UpdateGradeRuleDto} from '../../dto/grade.dto';
import { GradesService } from '../../services/grades/grades.service';

@ApiTags('Academics / Grade Rules')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('grade-rules')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  @RequirePermissions('create:academics') // Usually restricted to high-level admins
  @ApiOperation({ summary: 'Create a new grade rule' })
  create( @Body() createDto: CreateGradeRuleDto) {
    return this.gradesService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get all grade rules' })
  @ApiPaginatedResponse(CreateGradeRuleDto)
  findAll(
    
    @Query() queryOptions: GradeRuleQueryOptionsDto,
  ) {
    return this.gradesService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get grade rule by ID' })
  findOne( @Param('id') id: string) {
    return this.gradesService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:academics')
  @ApiOperation({ summary: 'Update a grade rule' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateGradeRuleDto,
  ) {
    return this.gradesService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:academics')
  @ApiOperation({ summary: 'Delete a grade rule' })
  remove( @Param('id') id: string) {
    return this.gradesService.remove(id, );
  }
}
