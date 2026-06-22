import { CurrentInstitute } from '@core/decorators/current-institute.decorator';
import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { RegisterDeviceDto } from '../../dto/register-device.dto';
import { LicenseManagementService } from '../../services/license-management/license-management.service';

@ApiTags('SaaS / License Management')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('saas/licenses/devices')
export class LicenseManagementController {
  constructor(private readonly licenseManagementService: LicenseManagementService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register the current device session. Will throw 403 if Institute limit is reached.'})
  registerDevice(
    @CurrentInstitute() instituteId: string,
    @Req() req: any,
    @Body() dto: RegisterDeviceDto,
  ) {
    const userId = req.user.id;
    // Note: Any authenticated user (staff, student) can call this to register their own device
    return this.licenseManagementService.registerDevice(instituteId, userId, dto);
  }

  @Get()
  @RequirePermissions('manage:saas')
  @ApiOperation({ summary: 'List all devices registered across the institute' })
  @ApiQuery({ name: 'userId', required: false, description: 'Filter by specific user ID' })
  listDevices( @Query('userId') targetUserId?: string) {
    return this.licenseManagementService.listDevices( targetUserId);
  }

  @Patch(':id/revoke')
  @RequirePermissions('manage:saas')
  @ApiOperation({ summary: 'Forcefully revoke a device, freeing up a license slot' })
  revokeDevice(@Param('id') id: string, ) {
    return this.licenseManagementService.revokeDevice(id, );
  }
}
