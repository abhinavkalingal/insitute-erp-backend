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
var WebhookDispatcherService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookDispatcherService = void 0;
const prisma_master_service_1 = require("../../../../../infrastructure/database/prisma-master.service");
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
const crypto_1 = require("crypto");
let WebhookDispatcherService = WebhookDispatcherService_1 = class WebhookDispatcherService {
    prisma;
    logger = new common_1.Logger(WebhookDispatcherService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async dispatchEvent(instituteId, eventType, payload) {
        try {
            const endpoints = await this.prisma.webhookEndpoint.findMany({
                where: {
                    instituteId,
                    isActive: true
                }
            });
            if (endpoints.length === 0)
                return;
            const eventId = `evt_${(0, crypto_1.randomUUID)()}`;
            const payloadString = JSON.stringify(payload);
            const subscribedEndpoints = endpoints.filter((ep) => {
                const events = ep.events;
                return events.includes('*') || events.includes(eventType);
            });
            for (const endpoint of subscribedEndpoints) {
                this.sendHttpRequest(endpoint, eventId, eventType, payload, payloadString).catch((err) => {
                    this.logger.error(`Unhandled error dispatching webhook to ${endpoint.url}: ${err.message}`);
                });
            }
        }
        catch (error) {
            this.logger.error(`Error initiating webhook dispatch: ${error.message}`);
        }
    }
    async sendHttpRequest(endpoint, eventId, eventType, payload, payloadString) {
        const timestamp = Math.floor(Date.now() / 1000).toString();
        const signaturePayload = `${timestamp}.${payloadString}`;
        const signature = crypto
            .createHmac('sha256', endpoint.secret)
            .update(signaturePayload)
            .digest('hex');
        const headers = {
            'Content-Type': 'application/json',
            'x-institute-event-id': eventId,
            'x-institute-event': eventType,
            'x-institute-timestamp': timestamp,
            'x-institute-signature': `v1=${signature}`
        };
        let status = 'FAILED';
        let statusCode = null;
        let responseBody = null;
        try {
            const response = await fetch(endpoint.url, {
                method: 'POST',
                headers,
                body: payloadString,
            });
            statusCode = response.status;
            responseBody = await response.text();
            if (response.ok) {
                status = 'SUCCESS';
            }
        }
        catch (error) {
            status = 'FAILED';
            responseBody = error.message;
        }
        await this.prisma.webhookDelivery.create({
            data: {
                webhookEndpointId: endpoint.id,
                eventId,
                eventType,
                payload: payload,
                status,
                statusCode,
                responseBody: responseBody ? responseBody.substring(0, 1000) : null,
            }
        });
    }
};
exports.WebhookDispatcherService = WebhookDispatcherService;
exports.WebhookDispatcherService = WebhookDispatcherService = WebhookDispatcherService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_master_service_1.PrismaMasterService])
], WebhookDispatcherService);
//# sourceMappingURL=webhook-dispatcher.service.js.map