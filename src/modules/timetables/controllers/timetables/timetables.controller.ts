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
  CreateTimetableDto,
  TimetableQueryOptionsDto,
  UpdateTimetableDto} from '../../dto/timetable.dto';
import { TimetablesService } from '../../services/timetables/timetables.service';

@ApiTags('Timetables / Schedules')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('timetables')
export class TimetablesController {
  constructor(private readonly timetablesService: TimetablesService) {}

  @Post()
  @RequirePermissions('create:academics')
  @ApiOperation({ summary: 'Create a new timetable with periods' })
  create( @Body() createDto: CreateTimetableDto) {
    return this.timetablesService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get all timetables with pagination' })
  @ApiPaginatedResponse(CreateTimetableDto)
  findAll(
    
    @Query() queryOptions: TimetableQueryOptionsDto,
  ) {
    return this.timetablesService.findAll( queryOptions);
  }

  @Get('teacher/:staffId')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get aggregated schedule for a specific teacher' })
  findTeacherSchedule( @Param('staffId') staffId: string) {
    return this.timetablesService.findTeacherSchedule(staffId, );
  }

  @Get(':id')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get timetable by ID' })
  findOne( @Param('id') id: string) {
    return this.timetablesService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:academics')
  @ApiOperation({ summary: 'Update a timetable (re-syncs periods)' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateTimetableDto,
  ) {
    return this.timetablesService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:academics')
  @ApiOperation({ summary: 'Delete a timetable' })
  remove( @Param('id') id: string) {
    return this.timetablesService.remove(id, );
  }
}
