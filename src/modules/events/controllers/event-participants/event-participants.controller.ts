import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { ApiPaginatedResponse } from '@core/utils/pagination/api-paginated-response.decorator';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  ParticipantQueryOptionsDto,
  RegisterParticipantDto} from '../../dto/register-participant.dto';
import { EventParticipantsService } from '../../services/event-participants/event-participants.service';

@ApiTags('Events / Participants')
@Controller('event-participants')
export class EventParticipantsController {
  constructor(private readonly eventParticipantsService: EventParticipantsService) {}

  /**
   * Note: This could theoretically be public if public guests are registering,
   * but for this ERP, we assume an Admin or the User themselves is registering.
   * A truly public guest registration would need a separate unauthenticated endpoint.
   */
  @Post('register')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('create:events')
  @ApiOperation({ summary: 'Register a participant for an event' })
  register( @Body() registerDto: RegisterParticipantDto) {
    return this.eventParticipantsService.register( registerDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('read:events')
  @ApiOperation({ summary: 'Get all event participants' })
  @ApiPaginatedResponse(RegisterParticipantDto)
  findAll(
    
    @Query() queryOptions: ParticipantQueryOptionsDto,
  ) {
    return this.eventParticipantsService.findAll( queryOptions);
  }

  @Patch(':id/cancel')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('update:events')
  @ApiOperation({ summary: 'Cancel a registration' })
  cancelRegistration( @Param('id') id: string) {
    return this.eventParticipantsService.cancelRegistration(id, );
  }
}
