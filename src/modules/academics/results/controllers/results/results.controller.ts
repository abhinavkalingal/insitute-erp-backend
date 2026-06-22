import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResultQueryOptionsDto } from '../../dto/result-query-options.dto';
import { ResultsService } from '../../services/results/results.service';

@ApiTags('Academics / Results')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post('generate/:examTermId')
  @RequirePermissions('update:academics') // Typically an admin/principal function
  @ApiOperation({ summary: 'Calculate and generate results for an Exam Term' })
  generateResults(
    
    @Param('examTermId') examTermId: string,
  ) {
    return this.resultsService.generateResultsForTerm( examTermId);
  }

  @Get('terms/:examTermId/rankings')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get the leaderboard/ranking for a specific Exam Term' })
  getRankings(
    
    @Param('examTermId') examTermId: string,
    @Query() queryOptions: ResultQueryOptionsDto,
  ) {
    return this.resultsService.getRankings( examTermId, queryOptions);
  }

  @Get('mark-sheet/:examTermId/:studentId')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get a formal mark sheet for a student' })
  getMarkSheet(
    
    @Param('examTermId') examTermId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.resultsService.getMarkSheet( examTermId, studentId);
  }
}
