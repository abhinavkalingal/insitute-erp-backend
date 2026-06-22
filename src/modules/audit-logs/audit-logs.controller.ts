import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';

import { AuditLogsService } from './audit-logs.service';
import { AuditLogQueryDto } from './dto/audit-log-query.dto';

@ApiTags('Audit Logs')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('audit-logs')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Get('activity')
  @RequirePermissions('read:audit-logs')
  @ApiOperation({ summary: 'Get all user activity logs' })
  findActivityLogs(
    
    @Query() query: AuditLogQueryDto,
  ) {
    return this.auditLogsService.findActivityLogs( query);
  }

  @Get('logins')
  @RequirePermissions('read:audit-logs')
  @ApiOperation({ summary: 'Get login history' })
  findLoginHistory(
    
    @Query() query: AuditLogQueryDto,
  ) {
    return this.auditLogsService.findLoginHistory( query);
  }

  @Get('data-changes')
  @RequirePermissions('read:audit-logs')
  @ApiOperation({ summary: 'Get data change history' })
  findDataChanges(
    
    @Query() query: AuditLogQueryDto,
  ) {
    return this.auditLogsService.findDataChanges( query);
  }

  @Get('security')
  @RequirePermissions('read:audit-logs')
  @ApiOperation({ summary: 'Get security and system events' })
  findSecurityEvents(
    
    @Query() query: AuditLogQueryDto,
  ) {
    return this.auditLogsService.findSecurityEvents( query);
  }

  @Get(':entity/:entityId')
  @RequirePermissions('read:audit-logs')
  @ApiOperation({ summary: 'Get audit logs for a specific entity' })
  findByEntity(
    
    @Param('entity') entity: string,
    @Param('entityId') entityId: string,
  ) {
    return this.auditLogsService.findByEntity( entity, entityId);
  }
}
