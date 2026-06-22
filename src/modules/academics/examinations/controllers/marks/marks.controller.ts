import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { ApiPaginatedResponse } from '@core/utils/pagination/api-paginated-response.decorator';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BulkUpsertMarksDto, MarkQueryOptionsDto } from '../../dto/mark.dto';
import { StudentMarkDto } from '../../dto/mark.dto';
import { MarksService } from '../../services/marks/marks.service';

@ApiTags('Academics / Marks')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('marks')
export class MarksController {
  constructor(private readonly marksService: MarksService) {}

  @Post('bulk-upsert')
  @RequirePermissions('update:academics') // Typically a teacher/staff permission
  @ApiOperation({ summary: 'Bulk upsert marks for an exam' })
  bulkUpsert( @Body() bulkDto: BulkUpsertMarksDto) {
    return this.marksService.bulkUpsertMarks( bulkDto);
  }

  @Get()
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get all marks with pagination' })
  @ApiPaginatedResponse(StudentMarkDto)
  findAll( @Query() queryOptions: MarkQueryOptionsDto) {
    return this.marksService.findAll( queryOptions);
  }
}
