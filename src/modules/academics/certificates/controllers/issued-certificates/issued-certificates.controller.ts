import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { ApiPaginatedResponse } from '@core/utils/pagination/api-paginated-response.decorator';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  IssueCertificateDto,
  IssuedCertificateQueryOptionsDto} from '../../dto/issue-certificate.dto';
import { IssuedCertificatesService } from '../../services/issued-certificates/issued-certificates.service';

@ApiTags('Academics / Issued Certificates')
@Controller('issued-certificates')
export class IssuedCertificatesController {
  constructor(private readonly issuedCertificatesService: IssuedCertificatesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('create:academics') // Usually principal or high admin
  @ApiOperation({ summary: 'Issue a new certificate to a student' })
  issue( @Body() issueDto: IssueCertificateDto) {
    return this.issuedCertificatesService.issue( issueDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('read:academics')
  @ApiOperation({ summary: 'Get all issued certificates' })
  @ApiPaginatedResponse(IssueCertificateDto)
  findAll(
    
    @Query() queryOptions: IssuedCertificateQueryOptionsDto,
  ) {
    return this.issuedCertificatesService.findAll( queryOptions);
  }

  /**
   * PUBLIC ENDPOINT
   * This endpoint is deliberately left unprotected by AuthGuard so that
   * employers scanning the QR code can view the validation payload.
   */
  @Get('verify/:certificateNumber')
  @ApiOperation({ summary: 'PUBLIC: Verify a certificate by its unique number (via QR Code)' })
  verifyQrCode(@Param('certificateNumber') certificateNumber: string) {
    return this.issuedCertificatesService.verifyQrCode(certificateNumber);
  }
}
