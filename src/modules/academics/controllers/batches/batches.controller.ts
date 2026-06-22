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

import { BatchQueryOptionsDto, CreateBatchDto, UpdateBatchDto } from '../../dto/batch.dto';
import { BatchesService } from '../../services/batches/batches.service';

@ApiTags('Academics / Batches')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('batches')
export class BatchesController {
  constructor(private readonly batchesService: BatchesService) {}

  @Post()
  @RequirePermissions('create:academics')
  @ApiOperation({ summary: 'Create a new batch' })
  create( @Body() createDto: CreateBatchDto) {
    return this.batchesService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get all batches with pagination' })
  @ApiPaginatedResponse(CreateBatchDto)
  findAll( @Query() queryOptions: BatchQueryOptionsDto) {
    return this.batchesService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get batch by ID' })
  findOne( @Param('id') id: string) {
    return this.batchesService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:academics')
  @ApiOperation({ summary: 'Update a batch' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateBatchDto,
  ) {
    return this.batchesService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:academics')
  @ApiOperation({ summary: 'Soft delete a batch' })
  remove( @Param('id') id: string) {
    return this.batchesService.remove(id, );
  }
}
