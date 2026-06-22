"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CustomDomainsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomDomainsService = void 0;
const saas_enforcement_service_1 = require("../../../../../core/services/saas-enforcement.service");
const prisma_master_service_1 = require("../../../../../infrastructure/database/prisma-master.service");
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const dns = __importStar(require("dns"));
let CustomDomainsService = CustomDomainsService_1 = class CustomDomainsService {
    prisma;
    saasEnforcement;
    logger = new common_1.Logger(CustomDomainsService_1.name);
    constructor(prisma, saasEnforcement) {
        this.prisma = prisma;
        this.saasEnforcement = saasEnforcement;
    }
    async getDomain(instituteId) {
        return this.prisma.customDomain.findUnique({
            where: { instituteId }
        });
    }
    async registerDomain(instituteId, dto) {
        await this.saasEnforcement.checkFeatureAccess(instituteId, 'ENABLE_CUSTOM_DOMAIN');
        const existingGlobal = await this.prisma.customDomain.findUnique({
            where: { domain: dto.domain }
        });
        if (existingGlobal) {
            if (existingGlobal.instituteId === instituteId) {
                throw new common_1.BadRequestException('You have already registered this domain.');
            }
            throw new common_1.BadRequestException('This domain is already registered to another institute.');
        }
        const verificationCode = `saas-verify=${(0, crypto_1.randomUUID)()}`;
        return this.prisma.customDomain.upsert({
            where: { instituteId },
            update: {
                domain: dto.domain,
                status: 'PENDING_VERIFICATION',
                sslStatus: 'PENDING',
                verificationCode
            },
            create: {
                instituteId,
                domain: dto.domain,
                status: 'PENDING_VERIFICATION',
                sslStatus: 'PENDING',
                verificationCode
            }
        });
    }
    async verifyDomain(instituteId) {
        const customDomain = await this.prisma.customDomain.findUnique({
            where: { instituteId }
        });
        if (!customDomain) {
            throw new common_1.NotFoundException('No custom domain registered for this institute.');
        }
        if (customDomain.status === 'ACTIVE') {
            return { message: 'Domain is already verified and active.', customDomain };
        }
        try {
            const records = await dns.promises.resolveTxt(customDomain.domain);
            const flatRecords = records.flat();
            const isVerified = flatRecords.includes(customDomain.verificationCode);
            if (isVerified) {
                const updated = await this.prisma.customDomain.update({
                    where: { instituteId },
                    data: { status: 'ACTIVE' }
                });
                return { message: 'Domain successfully verified.', customDomain: updated };
            }
            else {
                return {
                    message: 'Verification failed. TXT record not found.',
                    customDomain
                };
            }
        }
        catch (error) {
            this.logger.warn(`DNS lookup failed for ${customDomain.domain}: ${error.message}`);
            return {
                message: 'Verification failed. Could not resolve DNS records.',
                customDomain
            };
        }
    }
    async removeDomain(instituteId) {
        const customDomain = await this.prisma.customDomain.findUnique({
            where: { instituteId }
        });
        if (!customDomain) {
            throw new common_1.NotFoundException('No custom domain found.');
        }
        await this.prisma.customDomain.delete({
            where: { instituteId }
        });
        return { message: 'Custom domain removed successfully.' };
    }
};
exports.CustomDomainsService = CustomDomainsService;
exports.CustomDomainsService = CustomDomainsService = CustomDomainsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_master_service_1.PrismaMasterService,
        saas_enforcement_service_1.SaasEnforcementService])
], CustomDomainsService);
//# sourceMappingURL=custom-domains.service.js.map