import { CurrentInstitute } from '@core/decorators/current-institute.decorator';
import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RegisterCustomDomainDto } from '../../dto/custom-domain.dto';
import { CustomDomainsService } from '../../services/custom-domains/custom-domains.service';

@ApiTags('SaaS / Custom Domains')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('saas/custom-domains')
export class CustomDomainsController {
  constructor(private readonly customDomainsService: CustomDomainsService) {}

  @Get()
  @RequirePermissions('read:branding')
  @ApiOperation({ summary: 'Get current custom domain status and verification code' })
  getDomain(@CurrentInstitute() instituteId: string) {
    return this.customDomainsService.getDomain(instituteId);
  }

  @Post()
  @RequirePermissions('update:branding')
  @ApiOperation({ summary: 'Register a new custom domain' })
  registerDomain(@CurrentInstitute() instituteId: string, @Body() dto: RegisterCustomDomainDto) {
    return this.customDomainsService.registerDomain(instituteId, dto);
  }

  @Post('verify')
  @RequirePermissions('update:branding')
  @ApiOperation({ summary: 'Trigger a manual DNS verification check' })
  verifyDomain(@CurrentInstitute() instituteId: string) {
    return this.customDomainsService.verifyDomain(instituteId);
  }

  @Delete()
  @RequirePermissions('update:branding')
  @ApiOperation({ summary: 'Remove the custom domain mapping' })
  removeDomain(@CurrentInstitute() instituteId: string) {
    return this.customDomainsService.removeDomain(instituteId);
  }
}
