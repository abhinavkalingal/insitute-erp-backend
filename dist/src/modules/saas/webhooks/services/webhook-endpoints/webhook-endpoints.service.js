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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookEndpointsService = void 0;
const saas_enforcement_service_1 = require("../../../../../core/services/saas-enforcement.service");
const prisma_master_service_1 = require("../../../../../infrastructure/database/prisma-master.service");
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
let WebhookEndpointsService = class WebhookEndpointsService {
    prisma;
    saasEnforcement;
    constructor(prisma, saasEnforcement) {
        this.prisma = prisma;
        this.saasEnforcement = saasEnforcement;
    }
    async createEndpoint(instituteId, dto) {
        await this.saasEnforcement.checkFeatureAccess(instituteId, 'ENABLE_WEBHOOKS');
        const secret = `whsec_${crypto.randomBytes(24).toString('base64url')}`;
        return this.prisma.webhookEndpoint.create({
            data: {
                instituteId,
                url: dto.url,
                description: dto.description,
                events: dto.events,
                secret,
                isActive: true
            }
        });
    }
    async listEndpoints(instituteId) {
        return this.prisma.webhookEndpoint.findMany({
            where: { instituteId },
            orderBy: { createdAt: 'desc' }
        });
    }
    async deleteEndpoint(id, instituteId) {
        const endpoint = await this.prisma.webhookEndpoint.findFirst({
            where: { id, instituteId }
        });
        if (!endpoint) {
            throw new common_1.NotFoundException('Webhook endpoint not found');
        }
        await this.prisma.webhookEndpoint.delete({
            where: { id }
        });
        return { message: 'Webhook endpoint deleted successfully.' };
    }
};
exports.WebhookEndpointsService = WebhookEndpointsService;
exports.WebhookEndpointsService = WebhookEndpointsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_master_service_1.PrismaMasterService,
        saas_enforcement_service_1.SaasEnforcementService])
], WebhookEndpointsService);
//# sourceMappingURL=webhook-endpoints.service.js.map