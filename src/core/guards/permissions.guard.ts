import { PrismaService } from '@infrastructure/database/prisma.service';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) {
      return true; // No permissions required
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (user.isSuperAdmin) {
      const userPermissions = new Set<string>(user.permissions || []);
      const hasPermission = requiredPermissions.every((permission) =>
        userPermissions.has(permission),
      );
      if (!hasPermission) {
        throw new ForbiddenException('Insufficient permissions');
      }
      return true;
    }

    // Fetch user with roles and permissions
    const userWithRoles = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true}}}}}}}});

    if (!userWithRoles) {
      throw new ForbiddenException('User not found');
    }

    // Extract all unique permission actions the user has
    const userPermissions = new Set<string>();
    userWithRoles.roles.forEach((ur) => {
      ur.role.permissions.forEach((rp) => {
        userPermissions.add(rp.permission.action);
      });
    });

    // Check if user has ALL required permissions (or ANY, depending on requirement. Usually ALL)
    // Let's implement ALL required permissions
    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.has(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
