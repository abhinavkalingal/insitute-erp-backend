import { SaasEnforcementService } from '@core/services/saas-enforcement.service';
import { PrismaMasterService } from '@infrastructure/database/prisma-master.service';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { UpdateInstituteBrandingDto } from '../../dto/institute-branding.dto';

@Injectable()
export class WhiteLabelService {
  constructor(
    private readonly prisma: PrismaMasterService,
    private readonly saasEnforcement: SaasEnforcementService,
  ) {}

  async getBranding(instituteId: string) {
    const branding = await this.prisma.instituteBranding.findUnique({
      where: { instituteId }});

    // If branding doesn't exist, create default
    if (!branding) {
      return this.prisma.instituteBranding.create({
        data: { instituteId }});
    }

    return branding;
  }

  async updateBranding(instituteId: string, updateDto: UpdateInstituteBrandingDto) {
    // If they are trying to hide SaaS branding, verify they have the feature enabled
    // checkFeatureAccess will throw a ForbiddenException if not enabled
    if (updateDto.hideSaasBranding === true) {
      await this.saasEnforcement.checkFeatureAccess(instituteId, 'ENABLE_WHITE_LABEL');
    }

    const existing = await this.prisma.instituteBranding.findUnique({
      where: { instituteId }});

    if (existing) {
      return this.prisma.instituteBranding.update({
        where: { instituteId },
        data: updateDto});
    }

    return this.prisma.instituteBranding.create({
      data: {
        instituteId,
        ...updateDto}});
  }

  async getPublicBrandingByDomain(domain: string) {
    // The profile Json field on Institute contains the 'domain' field
    // We will query the Institute by its domain name to fetch the associated branding.
    // In Prisma JSON filtering can be tricky depending on the DB, but we can do it like this:
    const institutes = await this.prisma.institute.findMany({
      where: {
        profile: {
          path: ['domain'],
          equals: domain}},
      include: { branding: true },
      take: 1});

    if (institutes.length === 0) {
      throw new NotFoundException('Institute not found for this domain');
    }

    const institute = institutes[0];
    const branding = institute.branding;

    return {
      instituteName: institute.name,
      logoUrl: branding?.logoUrl || null,
      faviconUrl: branding?.faviconUrl || null,
      primaryColor: branding?.primaryColor || '#2563EB',
      secondaryColor: branding?.secondaryColor || '#1E40AF',
      loginBackgroundUrl: branding?.loginBackgroundUrl || null,
      loginLayout: branding?.loginLayout || 'split',
      hideSaasBranding: branding?.hideSaasBranding || false};
  }
}
