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

import { CourseQueryOptionsDto, CreateCourseDto, UpdateCourseDto } from '../../dto/course.dto';
import { CoursesService } from '../../services/courses/courses.service';

@ApiTags('Academics / Courses')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @RequirePermissions('create:academics')
  @ApiOperation({ summary: 'Create a new course (with subjects mapping)' })
  create( @Body() createDto: CreateCourseDto) {
    return this.coursesService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get all courses with pagination' })
  @ApiPaginatedResponse(CreateCourseDto)
  findAll( @Query() queryOptions: CourseQueryOptionsDto) {
    return this.coursesService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get course by ID' })
  findOne( @Param('id') id: string) {
    return this.coursesService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:academics')
  @ApiOperation({ summary: 'Update a course (and sync subjects)' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:academics')
  @ApiOperation({ summary: 'Soft delete a course' })
  remove( @Param('id') id: string) {
    return this.coursesService.remove(id, );
  }
}
