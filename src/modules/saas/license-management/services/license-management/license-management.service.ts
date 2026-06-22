import { SaasEnforcementService } from '@core/services/saas-enforcement.service';
import { PrismaService } from '@infrastructure/database/prisma.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException} from '@nestjs/common';

import { RegisterDeviceDto } from '../../dto/register-device.dto';

@Injectable()
export class LicenseManagementService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly saasEnforcement: SaasEnforcementService,
  ) {}

  async registerDevice(instituteId: string, userId: string, dto: RegisterDeviceDto) {
    // 1. Check if the device already exists for this user
    const existingDevice = await this.prisma.userDevice.findUnique({
      where: {
        userId_deviceIdentifier: {
          userId,
          deviceIdentifier: dto.deviceIdentifier}}});

    if (existingDevice) {
      if (existingDevice.isActive) {
        // Device is already registered and active, just update lastActiveAt
        return this.prisma.userDevice.update({
          where: { id: existingDevice.id },
          data: {
            lastActiveAt: new Date(),
            deviceName: dto.deviceName, // update name in case browser was updated
          }});
      } else {
        // Device exists but was revoked. We need to re-activate it, which consumes a license slot.
        await this.verifyLicenseLimit(instituteId);

        return this.prisma.userDevice.update({
          where: { id: existingDevice.id },
          data: {
            isActive: true,
            lastActiveAt: new Date(),
            deviceName: dto.deviceName}});
      }
    }

    // 2. This is a brand new device. Verify we have available license slots.
    await this.verifyLicenseLimit(instituteId);

    // 3. Create the new device
    return this.prisma.userDevice.create({
      data: {
        
        userId,
        deviceIdentifier: dto.deviceIdentifier,
        deviceName: dto.deviceName,
        isActive: true}});
  }

  private async verifyLicenseLimit(instituteId: string) {
    const activeDevicesCount = await this.prisma.userDevice.count({
      where: {
        
        isActive: true}});

    try {
      // The saasEnforcement checkLimit will throw ForbiddenException if limit exceeded
      await this.saasEnforcement.checkLimit(instituteId, 'MAX_DEVICES', activeDevicesCount, 1);
    } catch (error) {
      if (error instanceof ForbiddenException) {
        // Customize the error message slightly for the frontend to understand it's a device limit
        throw new ForbiddenException(
          'Maximum device limit reached for your Institute. Please log out from another device or contact your administrator to upgrade your plan.',
        );
      }
      throw error;
    }
  }

  async listDevices( targetUserId?: string) {
    return this.prisma.userDevice.findMany({
      where: {
        
        ...(targetUserId ? { userId: targetUserId } : {})},
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true}}},
      orderBy: { lastActiveAt: 'desc' }});
  }

  async revokeDevice(id: string, ) {
    const device = await this.prisma.userDevice.findUnique({
      where: { id }});

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    if (!device.isActive) {
      throw new BadRequestException('Device is already revoked');
    }

    await this.prisma.userDevice.update({
      where: { id },
      data: { isActive: false }});

    return { message: 'Device revoked successfully. License slot freed.' };
  }
}
