import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';

import { ApiKeysService } from '../../saas/api-keys/services/api-keys/api-keys.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(private readonly apiKeysService: ApiKeysService) {
    super();
  }

  async validate(req: Request): Promise<any> {
    // In NestJS Express, headers are lowercase
    const rawKey = (req as any).headers['x-api-key'];

    if (!rawKey) {
      throw new UnauthorizedException('API Key missing');
    }

    const instituteId = await this.apiKeysService.validateKey(rawKey as string);

    if (!instituteId) {
      throw new UnauthorizedException('Invalid or expired API Key');
    }

    // Mock a user payload to satisfy standard guards and @CurrentInstitute() decorator
    return { instituteId,
      id: 'API_SYSTEM_USER',
      email: 'api@system.local'};
  }
}
