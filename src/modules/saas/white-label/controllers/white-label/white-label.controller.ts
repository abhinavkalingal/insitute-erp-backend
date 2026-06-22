import { CurrentInstitute } from '@core/decorators/current-institute.decorator';
import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UpdateInstituteBrandingDto } from '../../dto/institute-branding.dto';
import { WhiteLabelService } from '../../services/white-label/white-label.service';

@ApiTags('SaaS / White Label')
@Controller('saas/white-label')
export class WhiteLabelController {
  constructor(private readonly whiteLabelService: WhiteLabelService) {}

  @Get('public/:domain')
  @ApiOperation({ summary: 'Get public branding settings by domain (No Auth Required)' })
  getPublicBrandingByDomain(@Param('domain') domain: string) {
    return this.whiteLabelService.getPublicBrandingByDomain(domain);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('read:branding')
  @ApiOperation({ summary: 'Get complete branding settings for the current institute' })
  getBranding(@CurrentInstitute() instituteId: string) {
    return this.whiteLabelService.getBranding(instituteId);
  }

  @Patch()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('update:branding')
  @ApiOperation({ summary: 'Update branding settings for the current institute' })
  updateBranding(
    @CurrentInstitute() instituteId: string,
    @Body() updateDto: UpdateInstituteBrandingDto,
  ) {
    return this.whiteLabelService.updateBranding(instituteId, updateDto);
  }
}

