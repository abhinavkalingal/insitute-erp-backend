import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { ApiPaginatedResponse } from '@core/utils/pagination/api-paginated-response.decorator';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IssuedIdCardQueryOptionsDto, IssueIdCardDto } from '../../dto/issue-id-card.dto';
import { IssuedIdCardsService } from '../../services/issued-id-cards/issued-id-cards.service';

@ApiTags('Academics / Issued ID Cards')
@Controller('issued-id-cards')
export class IssuedIdCardsController {
  constructor(private readonly issuedIdCardsService: IssuedIdCardsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('create:academics')
  @ApiOperation({ summary: 'Issue a new ID card' })
  issue( @Body() issueDto: IssueIdCardDto) {
    return this.issuedIdCardsService.issue( issueDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get all issued ID cards' })
  @ApiPaginatedResponse(IssueIdCardDto)
  findAll(
    
    @Query() queryOptions: IssuedIdCardQueryOptionsDto,
  ) {
    return this.issuedIdCardsService.findAll( queryOptions);
  }

  @Patch(':id/revoke')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('update:academics')
  @ApiOperation({ summary: 'Revoke an ID Card (e.g., if lost or stolen)' })
  revokeCard( @Param('id') id: string) {
    return this.issuedIdCardsService.revokeCard(id, );
  }

  /**
   * PUBLIC ENDPOINT
   * This endpoint is deliberately left unprotected by AuthGuard so that
   * security guards scanning the QR code can view the validation payload.
   */
  @Get('verify/:cardNumber')
  @ApiOperation({
    summary: 'PUBLIC: Verify an ID Card by its unique number (via QR/Barcode scanner)'})
  verifyCard(@Param('cardNumber') cardNumber: string) {
    return this.issuedIdCardsService.verifyCard(cardNumber);
  }
}
