import { CurrentInstitute } from '@core/decorators/current-institute.decorator';
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
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BranchesService } from './branches.service';
import { BranchQueryOptionsDto } from './dto/branch-query-options.dto';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@ApiTags('Branches')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-institute-id',
  required: false,
  description: 'Required for Super Admins to act on behalf of an institute'})
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post()
  @RequirePermissions('create:branches')
  @ApiOperation({ summary: 'Create a new branch for the current institute' })
  create(@CurrentInstitute() instituteId: string, @Body() createBranchDto: CreateBranchDto) {
    return this.branchesService.create(instituteId, createBranchDto);
  }

  @Get()
  @RequirePermissions('read:branches')
  @ApiOperation({ summary: 'Get all branches for the current institute' })
  @ApiPaginatedResponse(CreateBranchDto)
  findAll( @Query() queryOptions: BranchQueryOptionsDto) {
    return this.branchesService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:branches')
  @ApiOperation({ summary: 'Get branch by ID' })
  findOne( @Param('id') id: string) {
    return this.branchesService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:branches')
  @ApiOperation({ summary: 'Update a branch' })
  update(
    
    @Param('id') id: string,
    @Body() updateBranchDto: UpdateBranchDto,
  ) {
    return this.branchesService.update(id,  updateBranchDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:branches')
  @ApiOperation({ summary: 'Soft delete a branch' })
  remove( @Param('id') id: string) {
    return this.branchesService.remove(id, );
  }
}
