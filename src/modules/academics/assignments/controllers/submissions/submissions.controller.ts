import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { ApiPaginatedResponse } from '@core/utils/pagination/api-paginated-response.decorator';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  CreateSubmissionDto,
  GradeSubmissionDto,
  SubmissionQueryOptionsDto} from '../../dto/submission.dto';
import { SubmissionsService } from '../../services/submissions/submissions.service';

@ApiTags('Academics / Submissions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  @RequirePermissions('create:academics') // Typically a student permission, but we'll use academics
  @ApiOperation({ summary: 'Submit an assignment' })
  submit(@Body() createDto: CreateSubmissionDto) {
    const { studentId, ...rest } = createDto;
    return this.submissionsService.submit(createDto, studentId);
  }

  @Patch(':id/grade')
  @RequirePermissions('update:academics') // Typically a staff permission
  @ApiOperation({ summary: 'Grade a submission' })
  grade(@Param('id') id: string, @Body() gradeDto: GradeSubmissionDto) {
    const { staffId, ...rest } = gradeDto;
    return this.submissionsService.grade(id, staffId, gradeDto);
  }

  @Get()
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get all submissions with pagination' })
  @ApiPaginatedResponse(CreateSubmissionDto)
  findAll(
    
    @Query() queryOptions: SubmissionQueryOptionsDto,
  ) {
    return this.submissionsService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get submission by ID' })
  findOne(@Param('id') id: string) {
    return this.submissionsService.findOne(id);
  }
}
