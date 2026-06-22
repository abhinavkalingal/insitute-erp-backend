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
  CreateEventCategoryDto,
  EventCategoryQueryOptionsDto,
  UpdateEventCategoryDto} from '../../dto/category.dto';
import { EventCategoriesService } from '../../services/event-categories/event-categories.service';

@ApiTags('Events / Categories')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('event-categories')
export class EventCategoriesController {
  constructor(private readonly eventCategoriesService: EventCategoriesService) {}

  @Post()
  @RequirePermissions('create:events')
  @ApiOperation({ summary: 'Create a new event category' })
  create( @Body() createDto: CreateEventCategoryDto) {
    return this.eventCategoriesService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:events')
  @ApiOperation({ summary: 'Get all event categories' })
  @ApiPaginatedResponse(CreateEventCategoryDto)
  findAll(
    
    @Query() queryOptions: EventCategoryQueryOptionsDto,
  ) {
    return this.eventCategoriesService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:events')
  @ApiOperation({ summary: 'Get a specific event category by ID' })
  findOne( @Param('id') id: string) {
    return this.eventCategoriesService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:events')
  @ApiOperation({ summary: 'Update an event category' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateEventCategoryDto,
  ) {
    return this.eventCategoriesService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:events')
  @ApiOperation({ summary: 'Delete an event category' })
  remove( @Param('id') id: string) {
    return this.eventCategoriesService.remove(id, );
  }
}
