import { CurrentInstitute } from '@core/decorators/current-institute.decorator';
import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateApiKeyDto } from '../../dto/api-key.dto';
import { ApiKeysService } from '../../services/api-keys/api-keys.service';

@ApiTags('SaaS / API Keys')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('saas/api-keys')
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Post()
  @RequirePermissions('manage:saas')
  @ApiOperation({ summary: 'Generate a new API Key' })
  createKey(@CurrentInstitute() instituteId: string, @Body() dto: CreateApiKeyDto) {
    return this.apiKeysService.createKey(instituteId, dto);
  }

  @Get()
  @RequirePermissions('manage:saas')
  @ApiOperation({ summary: 'List all API Keys for the current institute' })
  listKeys(@CurrentInstitute() instituteId: string) {
    return this.apiKeysService.listKeys(instituteId);
  }

  @Patch(':id/revoke')
  @RequirePermissions('manage:saas')
  @ApiOperation({ summary: 'Revoke an active API Key' })
  revokeKey(@CurrentInstitute() instituteId: string, @Param('id') id: string) {
    return this.apiKeysService.revokeKey(instituteId, id);
  }
}
