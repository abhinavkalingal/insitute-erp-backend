"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseManagementService = void 0;
const saas_enforcement_service_1 = require("../../../../../core/services/saas-enforcement.service");
const prisma_service_1 = require("../../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
let LicenseManagementService = class LicenseManagementService {
    prisma;
    saasEnforcement;
    constructor(prisma, saasEnforcement) {
        this.prisma = prisma;
        this.saasEnforcement = saasEnforcement;
    }
    async registerDevice(instituteId, userId, dto) {
        const existingDevice = await this.prisma.userDevice.findUnique({
            where: {
                userId_deviceIdentifier: {
                    userId,
                    deviceIdentifier: dto.deviceIdentifier
                }
            }
        });
        if (existingDevice) {
            if (existingDevice.isActive) {
                return this.prisma.userDevice.update({
                    where: { id: existingDevice.id },
                    data: {
                        lastActiveAt: new Date(),
                        deviceName: dto.deviceName,
                    }
                });
            }
            else {
                await this.verifyLicenseLimit(instituteId);
                return this.prisma.userDevice.update({
                    where: { id: existingDevice.id },
                    data: {
                        isActive: true,
                        lastActiveAt: new Date(),
                        deviceName: dto.deviceName
                    }
                });
            }
        }
        await this.verifyLicenseLimit(instituteId);
        return this.prisma.userDevice.create({
            data: {
                userId,
                deviceIdentifier: dto.deviceIdentifier,
                deviceName: dto.deviceName,
                isActive: true
            }
        });
    }
    async verifyLicenseLimit(instituteId) {
        const activeDevicesCount = await this.prisma.userDevice.count({
            where: {
                isActive: true
            }
        });
        try {
            await this.saasEnforcement.checkLimit(instituteId, 'MAX_DEVICES', activeDevicesCount, 1);
        }
        catch (error) {
            if (error instanceof common_1.ForbiddenException) {
                throw new common_1.ForbiddenException('Maximum device limit reached for your Institute. Please log out from another device or contact your administrator to upgrade your plan.');
            }
            throw error;
        }
    }
    async listDevices(targetUserId) {
        return this.prisma.userDevice.findMany({
            where: {
                ...(targetUserId ? { userId: targetUserId } : {})
            },
            include: {
                user: {
                    select: {
                        email: true,
                        firstName: true,
                        lastName: true
                    }
                }
            },
            orderBy: { lastActiveAt: 'desc' }
        });
    }
    async revokeDevice(id) {
        const device = await this.prisma.userDevice.findUnique({
            where: { id }
        });
        if (!device) {
            throw new common_1.NotFoundException('Device not found');
        }
        if (!device.isActive) {
            throw new common_1.BadRequestException('Device is already revoked');
        }
        await this.prisma.userDevice.update({
            where: { id },
            data: { isActive: false }
        });
        return { message: 'Device revoked successfully. License slot freed.' };
    }
};
exports.LicenseManagementService = LicenseManagementService;
exports.LicenseManagementService = LicenseManagementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        saas_enforcement_service_1.SaasEnforcementService])
], LicenseManagementService);
//# sourceMappingURL=license-management.service.js.map