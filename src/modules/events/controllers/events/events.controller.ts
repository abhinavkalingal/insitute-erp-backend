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

import { CreateEventDto, EventQueryOptionsDto, UpdateEventDto } from '../../dto/event.dto';
import { EventsService } from '../../services/events/events.service';

@ApiTags('Events / Events')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @RequirePermissions('create:events')
  @ApiOperation({ summary: 'Create a new event' })
  create( @Body() createDto: CreateEventDto) {
    return this.eventsService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:events')
  @ApiOperation({ summary: 'Get all events' })
  @ApiPaginatedResponse(CreateEventDto)
  findAll( @Query() queryOptions: EventQueryOptionsDto) {
    return this.eventsService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:events')
  @ApiOperation({ summary: 'Get a specific event by ID' })
  findOne( @Param('id') id: string) {
    return this.eventsService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:events')
  @ApiOperation({ summary: 'Update an event' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateEventDto,
  ) {
    return this.eventsService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:events')
  @ApiOperation({ summary: 'Delete an event' })
  remove( @Param('id') id: string) {
    return this.eventsService.remove(id, );
  }
}
