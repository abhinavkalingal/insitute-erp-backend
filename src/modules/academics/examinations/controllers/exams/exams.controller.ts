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
  CreateExamDto,
  CreateExamTermDto,
  ExamQueryOptionsDto,
  ExamTermQueryOptionsDto,
  UpdateExamDto,
  UpdateExamTermDto} from '../../dto/exam.dto';
import { ExamsService } from '../../services/exams/exams.service';

@ApiTags('Academics / Exams')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller()
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  // --- Exam Terms ---

  @Post('exam-terms')
  @RequirePermissions('create:academics')
  @ApiOperation({ summary: 'Create a new exam term' })
  createTerm( @Body() createDto: CreateExamTermDto) {
    return this.examsService.createTerm( createDto);
  }

  @Get('exam-terms')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get all exam terms' })
  @ApiPaginatedResponse(CreateExamTermDto)
  findAllTerms(
    
    @Query() queryOptions: ExamTermQueryOptionsDto,
  ) {
    return this.examsService.findAllTerms( queryOptions);
  }

  @Get('exam-terms/:id')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get exam term by ID' })
  findOneTerm( @Param('id') id: string) {
    return this.examsService.findOneTerm(id, );
  }

  @Patch('exam-terms/:id')
  @RequirePermissions('update:academics')
  @ApiOperation({ summary: 'Update an exam term (e.g. toggle isPublished)' })
  updateTerm(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateExamTermDto,
  ) {
    return this.examsService.updateTerm(id,  updateDto);
  }

  @Delete('exam-terms/:id')
  @RequirePermissions('delete:academics')
  @ApiOperation({ summary: 'Delete an exam term' })
  removeTerm( @Param('id') id: string) {
    return this.examsService.removeTerm(id, );
  }

  // --- Specific Exams ---

  @Post('exams')
  @RequirePermissions('create:academics')
  @ApiOperation({ summary: 'Create a specific exam paper' })
  createExam( @Body() createDto: CreateExamDto) {
    return this.examsService.createExam( createDto);
  }

  @Get('exams')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get all exam papers' })
  @ApiPaginatedResponse(CreateExamDto)
  findAllExams(
    
    @Query() queryOptions: ExamQueryOptionsDto,
  ) {
    return this.examsService.findAllExams( queryOptions);
  }

  @Get('exams/:id')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get specific exam by ID' })
  findOneExam( @Param('id') id: string) {
    return this.examsService.findOneExam(id, );
  }

  @Patch('exams/:id')
  @RequirePermissions('update:academics')
  @ApiOperation({ summary: 'Update an exam' })
  updateExam(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateExamDto,
  ) {
    return this.examsService.updateExam(id,  updateDto);
  }

  @Delete('exams/:id')
  @RequirePermissions('delete:academics')
  @ApiOperation({ summary: 'Delete an exam' })
  removeExam( @Param('id') id: string) {
    return this.examsService.removeExam(id, );
  }
}
