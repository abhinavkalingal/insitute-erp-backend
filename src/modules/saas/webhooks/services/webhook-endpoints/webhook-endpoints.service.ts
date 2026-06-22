import { SaasEnforcementService } from '@core/services/saas-enforcement.service';
import { PrismaMasterService } from '@infrastructure/database/prisma-master.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as crypto from 'crypto';

import { CreateWebhookEndpointDto } from '../../dto/webhook-endpoint.dto';

@Injectable()
export class WebhookEndpointsService {
  constructor(
    private readonly prisma: PrismaMasterService,
    private readonly saasEnforcement: SaasEnforcementService,
  ) {}

  async createEndpoint(instituteId: string, dto: CreateWebhookEndpointDto) {
    await this.saasEnforcement.checkFeatureAccess(instituteId, 'ENABLE_WEBHOOKS');

    const secret = `whsec_${crypto.randomBytes(24).toString('base64url')}`;

    return this.prisma.webhookEndpoint.create({
      data: {
        instituteId,
        url: dto.url,
        description: dto.description,
        events: dto.events, // Prisma Json handles array automatically
        secret,
        isActive: true}});
  }

  async listEndpoints(instituteId: string) {
    return this.prisma.webhookEndpoint.findMany({
      where: { instituteId },
      orderBy: { createdAt: 'desc' }});
  }

  async deleteEndpoint(id: string, instituteId: string) {
    const endpoint = await this.prisma.webhookEndpoint.findFirst({
      where: { id, instituteId }});

    if (!endpoint) {
      throw new NotFoundException('Webhook endpoint not found');
    }

    await this.prisma.webhookEndpoint.delete({
      where: { id }});

    return { message: 'Webhook endpoint deleted successfully.' };
  }
}
