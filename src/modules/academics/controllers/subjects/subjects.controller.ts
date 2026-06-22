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

import { CreateSubjectDto, SubjectQueryOptionsDto, UpdateSubjectDto } from '../../dto/subject.dto';
import { SubjectsService } from '../../services/subjects/subjects.service';

@ApiTags('Academics / Subjects')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  @RequirePermissions('create:academics')
  @ApiOperation({ summary: 'Create a new subject' })
  create( @Body() createDto: CreateSubjectDto) {
    return this.subjectsService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get all subjects with pagination' })
  @ApiPaginatedResponse(CreateSubjectDto)
  findAll( @Query() queryOptions: SubjectQueryOptionsDto) {
    return this.subjectsService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get subject by ID' })
  findOne( @Param('id') id: string) {
    return this.subjectsService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:academics')
  @ApiOperation({ summary: 'Update a subject' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateSubjectDto,
  ) {
    return this.subjectsService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:academics')
  @ApiOperation({ summary: 'Soft delete a subject' })
  remove( @Param('id') id: string) {
    return this.subjectsService.remove(id, );
  }
}
