import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';

export const CurrentInstitute = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  if (!user) {
    throw new ForbiddenException('User not authenticated');
  }

  // If user has a fixed (e.g., normal tenant user), return it.
  if (user.instituteId) { return user.instituteId; }

  // If user is a Super Admin (is null), they can specify target institute via header
  const targetInstituteId = request.headers['x-institute-id'] || request.headers['x-tenant-id'];

  if (!targetInstituteId) {
    throw new ForbiddenException(
      'Super Admin must provide x-institute-id header to perform tenant-specific actions',
    );
  }

  return targetInstituteId;
});
