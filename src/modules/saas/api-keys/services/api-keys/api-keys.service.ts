import { SaasEnforcementService } from '@core/services/saas-enforcement.service';
import { PrismaMasterService } from '@infrastructure/database/prisma-master.service';
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { CreateApiKeyDto } from '../../dto/api-key.dto';

@Injectable()
export class ApiKeysService {
  private readonly logger = new Logger(ApiKeysService.name);

  constructor(
    private readonly prisma: PrismaMasterService,
    private readonly saasEnforcement: SaasEnforcementService,
  ) {}

  async createKey(instituteId: string, dto: CreateApiKeyDto) {
    await this.saasEnforcement.checkFeatureAccess(instituteId, 'ENABLE_API_ACCESS');

    // Generate secure random key
    const rawKey = crypto.randomBytes(32).toString('hex');
    const prefix = rawKey.substring(0, 16); // e.g., for display: "a1b2c3d4e5f6g7h8..."

    // Hash the key using bcrypt
    const saltRounds = 10;
    const keyHash = await bcrypt.hash(rawKey, saltRounds);

    let expiresAt: Date | null = null;
    if (dto.expiresInDays) {
      expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + dto.expiresInDays);
    }

    const apiKey = await this.prisma.apiKey.create({
      data: {
        instituteId,
        name: dto.name,
        keyHash,
        prefix,
        expiresAt,
        isActive: true}});

    // Return the raw key ONLY ONCE. It cannot be retrieved again.
    return {
      message: 'API Key generated successfully. Please copy it now as it will not be shown again.',
      id: apiKey.id,
      name: apiKey.name,
      rawKey,
      expiresAt: apiKey.expiresAt};
  }

  async listKeys(instituteId: string) {
    // Only return safe metadata, never the keyHash
    return this.prisma.apiKey.findMany({
      where: { instituteId },
      select: {
        id: true,
        name: true,
        prefix: true,
        isActive: true,
        lastUsedAt: true,
        expiresAt: true,
        createdAt: true},
      orderBy: { createdAt: 'desc' }});
  }

  async revokeKey(instituteId: string, id: string) {
    const key = await this.prisma.apiKey.findUnique({
      where: { id }});

    if (!key || key.instituteId !== instituteId) {
      throw new NotFoundException('API Key not found.');
    }

    if (!key.isActive) {
      throw new BadRequestException('API Key is already revoked.');
    }

    await this.prisma.apiKey.update({
      where: { id },
      data: { isActive: false }});

    return { message: 'API Key revoked successfully.' };
  }

  async trackUsage(id: string) {
    try {
      await this.prisma.apiKey.update({
        where: { id },
        data: { lastUsedAt: new Date() }});
    } catch (error) {
      this.logger.error(`Failed to track usage for API key ${id}: ${error.message}`);
    }
  }

  /**
   * Used internally by the ApiKeyGuard/Strategy to validate incoming requests.
   */
  async validateKey(rawKey: string): Promise<string | null> {
    const prefix = rawKey.substring(0, 16);

    // Find keys matching the prefix
    const candidateKeys = await this.prisma.apiKey.findMany({
      where: {
        prefix,
        isActive: true}});

    for (const key of candidateKeys) {
      // Check expiration
      if (key.expiresAt && key.expiresAt < new Date()) {
        // Automatically deactivate expired keys asynchronously
        this.prisma.apiKey
          .update({ where: { id: key.id }, data: { isActive: false } })
          .catch(() => {});
        continue;
      }

      // Verify bcrypt hash
      const isValid = await bcrypt.compare(rawKey, key.keyHash);

      if (isValid) {
        // Track usage asynchronously
        this.trackUsage(key.id);
        return key.instituteId;
      }
    }

    return null;
  }
}
