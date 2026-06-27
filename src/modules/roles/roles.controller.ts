import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';

import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @RequirePermissions('create:roles')
  @ApiOperation({ summary: 'Create a new role' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @RequirePermissions('read:roles')
  @ApiOperation({ summary: 'Get all roles' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Patch(':id')
  @RequirePermissions('update:roles')
  @ApiOperation({ summary: 'Update a role and its permissions' })
  @ApiBody({ schema: { type: 'object', properties: { name: { type: 'string' }, permissionIds: { type: 'array', items: { type: 'string' } } } } })
  update(@Param('id') id: string, @Body() updateRoleDto: { name?: string; permissionIds?: string[] }) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:roles')
  @ApiOperation({ summary: 'Delete a role' })
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }

  @Post('assign/:userId/:roleId')
  @RequirePermissions('assign:roles')
  @ApiOperation({ summary: 'Assign a role to a user' })
  assignRole(@Param('userId') userId: string, @Param('roleId') roleId: string) {
    return this.rolesService.assignRoleToUser(userId, roleId);
  }
}
