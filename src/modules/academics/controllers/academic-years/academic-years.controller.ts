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
  AcademicYearQueryOptionsDto,
  CreateAcademicYearDto,
  UpdateAcademicYearDto} from '../../dto/academic-year.dto';
import { AcademicYearsService } from '../../services/academic-years/academic-years.service';

@ApiTags('Academics / Academic Years')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('academic-years')
export class AcademicYearsController {
  constructor(private readonly academicYearsService: AcademicYearsService) {}

  @Post()
  @RequirePermissions('create:academics')
  @ApiOperation({ summary: 'Create a new academic year' })
  create( @Body() createDto: CreateAcademicYearDto) {
    return this.academicYearsService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get all academic years with pagination' })
  @ApiPaginatedResponse(CreateAcademicYearDto)
  findAll(
    
    @Query() queryOptions: AcademicYearQueryOptionsDto,
  ) {
    return this.academicYearsService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get academic year by ID' })
  findOne( @Param('id') id: string) {
    return this.academicYearsService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:academics')
  @ApiOperation({ summary: 'Update an academic year' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateAcademicYearDto,
  ) {
    return this.academicYearsService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:academics')
  @ApiOperation({ summary: 'Delete an academic year' })
  remove( @Param('id') id: string) {
    return this.academicYearsService.remove(id, );
  }
}
