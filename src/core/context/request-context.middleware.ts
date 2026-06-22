import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { requestContext, RequestContextData } from './request.context';
import { PrismaMasterService } from '../../infrastructure/database/prisma-master.service';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly masterDb: PrismaMasterService
  ) {}

  async use(req: any, res: any, next: () => void) {
    let userId: string | undefined;

    // Attempt to extract userId from JWT if present
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payload = this.jwtService.decode(token) as any;
        if (payload && payload.sub) {
          userId = payload.sub;
        }
      } catch (e) {
        // Ignore invalid token here; let AuthGuard handle it
      }
    }

    // Resolve tenant based on header or subdomain
    let tenantId = req.headers['x-tenant-id'] as string;
    let tenantDbUrl: string | undefined;

    // Optional: resolve by origin/host for custom domains
    const host = req.headers.host;
    if (!tenantId && host) {
      // Very basic example: extract subdomain (e.g. inst1.erp.com -> inst1)
      const subdomain = host.split('.')[0];
      if (subdomain !== 'localhost' && subdomain !== 'api' && subdomain !== 'www') {
        const instituteByDomain = await this.masterDb.institute.findFirst({
          where: { OR: [{ domain: host }, { id: subdomain }] }});
        if (instituteByDomain) {
          tenantId = instituteByDomain.id;
          tenantDbUrl = instituteByDomain.databaseUrl || undefined;
        }
      }
    }

    // If tenantId was provided directly but we don't have dbUrl yet
    if (tenantId && !tenantDbUrl) {
      const institute = await this.masterDb.institute.findUnique({
        where: { id: tenantId }});
      if (institute) {
        tenantDbUrl = institute.databaseUrl || undefined;
      }
    }

    const contextData: RequestContextData = {
      userId,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      tenantId,
      tenantDbUrl};

    requestContext.run(contextData, () => {
      next();
    });
  }
}
