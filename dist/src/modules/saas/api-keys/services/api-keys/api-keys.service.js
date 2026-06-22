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
var ApiKeysService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeysService = void 0;
const saas_enforcement_service_1 = require("../../../../../core/services/saas-enforcement.service");
const prisma_master_service_1 = require("../../../../../infrastructure/database/prisma-master.service");
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
let ApiKeysService = ApiKeysService_1 = class ApiKeysService {
    prisma;
    saasEnforcement;
    logger = new common_1.Logger(ApiKeysService_1.name);
    constructor(prisma, saasEnforcement) {
        this.prisma = prisma;
        this.saasEnforcement = saasEnforcement;
    }
    async createKey(instituteId, dto) {
        await this.saasEnforcement.checkFeatureAccess(instituteId, 'ENABLE_API_ACCESS');
        const rawKey = crypto.randomBytes(32).toString('hex');
        const prefix = rawKey.substring(0, 16);
        const saltRounds = 10;
        const keyHash = await bcrypt.hash(rawKey, saltRounds);
        let expiresAt = null;
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
                isActive: true
            }
        });
        return {
            message: 'API Key generated successfully. Please copy it now as it will not be shown again.',
            id: apiKey.id,
            name: apiKey.name,
            rawKey,
            expiresAt: apiKey.expiresAt
        };
    }
    async listKeys(instituteId) {
        return this.prisma.apiKey.findMany({
            where: { instituteId },
            select: {
                id: true,
                name: true,
                prefix: true,
                isActive: true,
                lastUsedAt: true,
                expiresAt: true,
                createdAt: true
            },
            orderBy: { createdAt: 'desc' }
        });
    }
    async revokeKey(instituteId, id) {
        const key = await this.prisma.apiKey.findUnique({
            where: { id }
        });
        if (!key || key.instituteId !== instituteId) {
            throw new common_1.NotFoundException('API Key not found.');
        }
        if (!key.isActive) {
            throw new common_1.BadRequestException('API Key is already revoked.');
        }
        await this.prisma.apiKey.update({
            where: { id },
            data: { isActive: false }
        });
        return { message: 'API Key revoked successfully.' };
    }
    async trackUsage(id) {
        try {
            await this.prisma.apiKey.update({
                where: { id },
                data: { lastUsedAt: new Date() }
            });
        }
        catch (error) {
            this.logger.error(`Failed to track usage for API key ${id}: ${error.message}`);
        }
    }
    async validateKey(rawKey) {
        const prefix = rawKey.substring(0, 16);
        const candidateKeys = await this.prisma.apiKey.findMany({
            where: {
                prefix,
                isActive: true
            }
        });
        for (const key of candidateKeys) {
            if (key.expiresAt && key.expiresAt < new Date()) {
                this.prisma.apiKey
                    .update({ where: { id: key.id }, data: { isActive: false } })
                    .catch(() => { });
                continue;
            }
            const isValid = await bcrypt.compare(rawKey, key.keyHash);
            if (isValid) {
                this.trackUsage(key.id);
                return key.instituteId;
            }
        }
        return null;
    }
};
exports.ApiKeysService = ApiKeysService;
exports.ApiKeysService = ApiKeysService = ApiKeysService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_master_service_1.PrismaMasterService,
        saas_enforcement_service_1.SaasEnforcementService])
], ApiKeysService);
//# sourceMappingURL=api-keys.service.js.map