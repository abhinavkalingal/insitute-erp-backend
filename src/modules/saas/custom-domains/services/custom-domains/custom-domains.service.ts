import { SaasEnforcementService } from '@core/services/saas-enforcement.service';
import { PrismaMasterService } from '@infrastructure/database/prisma-master.service';
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as dns from 'dns';

import { RegisterCustomDomainDto } from '../../dto/custom-domain.dto';

@Injectable()
export class CustomDomainsService {
  private readonly logger = new Logger(CustomDomainsService.name);

  constructor(
    private readonly prisma: PrismaMasterService,
    private readonly saasEnforcement: SaasEnforcementService,
  ) {}

  async getDomain(instituteId: string) {
    return this.prisma.customDomain.findUnique({
      where: { instituteId }});
  }

  async registerDomain(instituteId: string, dto: RegisterCustomDomainDto) {
    // 1. Verify they have the feature
    await this.saasEnforcement.checkFeatureAccess(instituteId, 'ENABLE_CUSTOM_DOMAIN');

    // 2. Check if domain is already in use by anyone
    const existingGlobal = await this.prisma.customDomain.findUnique({
      where: { domain: dto.domain }});

    if (existingGlobal) {
      if (existingGlobal.instituteId === instituteId) {
        throw new BadRequestException('You have already registered this domain.');
      }
      throw new BadRequestException('This domain is already registered to another institute.');
    }

    // 3. Upsert their custom domain record
    const verificationCode = `saas-verify=${randomUUID()}`;

    return this.prisma.customDomain.upsert({
      where: { instituteId },
      update: {
        domain: dto.domain,
        status: 'PENDING_VERIFICATION',
        sslStatus: 'PENDING',
        verificationCode},
      create: {
        instituteId,
        domain: dto.domain,
        status: 'PENDING_VERIFICATION',
        sslStatus: 'PENDING',
        verificationCode}});
  }

  async verifyDomain(instituteId: string) {
    const customDomain = await this.prisma.customDomain.findUnique({
      where: { instituteId }});

    if (!customDomain) {
      throw new NotFoundException('No custom domain registered for this institute.');
    }

    if (customDomain.status === 'ACTIVE') {
      return { message: 'Domain is already verified and active.', customDomain };
    }

    try {
      // Perform DNS TXT lookup
      const records = await dns.promises.resolveTxt(customDomain.domain);

      // dns returns an array of arrays of strings for TXT records
      const flatRecords = records.flat();

      const isVerified = flatRecords.includes(customDomain.verificationCode as string);

      if (isVerified) {
        const updated = await this.prisma.customDomain.update({
          where: { instituteId },
          data: { status: 'ACTIVE' }});

        // At this point, we would ideally trigger a background job to provision an SSL cert.

        return { message: 'Domain successfully verified.', customDomain: updated };
      } else {
        return {
          message: 'Verification failed. TXT record not found.',
          customDomain};
      }
    } catch (error) {
      this.logger.warn(`DNS lookup failed for ${customDomain.domain}: ${error.message}`);
      return {
        message: 'Verification failed. Could not resolve DNS records.',
        customDomain};
    }
  }

  async removeDomain(instituteId: string) {
    const customDomain = await this.prisma.customDomain.findUnique({
      where: { instituteId }});

    if (!customDomain) {
      throw new NotFoundException('No custom domain found.');
    }

    await this.prisma.customDomain.delete({
      where: { instituteId }});

    return { message: 'Custom domain removed successfully.' };
  }
}
