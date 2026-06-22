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

import { CreateRoomDto, RoomQueryOptionsDto, UpdateRoomDto } from '../../dto/room.dto';
import { RoomsService } from '../../services/rooms/rooms.service';

@ApiTags('Timetables / Rooms')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @RequirePermissions('create:academics')
  @ApiOperation({ summary: 'Create a new room' })
  create( @Body() createDto: CreateRoomDto) {
    return this.roomsService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get all rooms with pagination' })
  @ApiPaginatedResponse(CreateRoomDto)
  findAll( @Query() queryOptions: RoomQueryOptionsDto) {
    return this.roomsService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get room by ID' })
  findOne( @Param('id') id: string) {
    return this.roomsService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:academics')
  @ApiOperation({ summary: 'Update a room' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateRoomDto,
  ) {
    return this.roomsService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:academics')
  @ApiOperation({ summary: 'Soft delete a room' })
  remove( @Param('id') id: string) {
    return this.roomsService.remove(id, );
  }
}
