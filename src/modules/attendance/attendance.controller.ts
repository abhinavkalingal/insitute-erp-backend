import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { ApiPaginatedResponse } from '@core/utils/pagination/api-paginated-response.decorator';
import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AttendanceService } from './attendance.service';
import { AttendanceQueryOptionsDto } from './dto/attendance-query-options.dto';
import { MarkAttendanceDto } from './dto/mark-attendance.dto';

@ApiTags('Attendance')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('mark')
  @RequirePermissions('create:academics') // Teachers and admins
  @ApiOperation({ summary: 'Mark or update attendance for a batch/staff' })
  markAttendance(
    
    @Request() req: any,
    @Body() markAttendanceDto: MarkAttendanceDto,
  ) {
    const takenById = req.user.id;
    return this.attendanceService.markAttendance( takenById, markAttendanceDto);
  }

  @Get()
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get list of attendance sheets' })
  findAll(
    
    @Query() queryOptions: AttendanceQueryOptionsDto,
  ) {
    return this.attendanceService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get a specific attendance sheet with all records' })
  findOne( @Param('id') id: string) {
    return this.attendanceService.findOne(id, );
  }

  @Get('student/:studentId')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get attendance history for a specific student' })
  getStudentHistory(
    
    @Param('studentId') studentId: string,
    @Query() queryOptions: AttendanceQueryOptionsDto,
  ) {
    return this.attendanceService.getStudentHistory(studentId,  queryOptions);
  }
}
