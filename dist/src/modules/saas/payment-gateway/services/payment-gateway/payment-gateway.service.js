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
var PaymentGatewayService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentGatewayService = void 0;
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
const Razorpay = require('razorpay');
let PaymentGatewayService = PaymentGatewayService_1 = class PaymentGatewayService {
    logger = new common_1.Logger(PaymentGatewayService_1.name);
    razorpayInstance;
    webhookSecret;
    constructor() {
        const key_id = process.env.RAZORPAY_KEY_ID;
        const key_secret = process.env.RAZORPAY_KEY_SECRET;
        this.webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '';
        if (key_id && key_secret) {
            this.razorpayInstance = new Razorpay({
                key_id,
                key_secret
            });
        }
        else {
            this.logger.warn('Razorpay credentials not found in .env. Payment features will fail.');
        }
    }
    async createOrder(amount, receiptId, currency = 'INR') {
        if (!this.razorpayInstance) {
            throw new common_1.InternalServerErrorException('Payment Gateway is not configured properly.');
        }
        try {
            const options = {
                amount: Math.round(amount * 100),
                currency,
                receipt: receiptId
            };
            const order = await this.razorpayInstance.orders.create(options);
            return order;
        }
        catch (error) {
            this.logger.error(`Failed to create Razorpay Order: ${error.message}`, error.stack);
            throw new common_1.InternalServerErrorException('Failed to communicate with payment gateway');
        }
    }
    verifyWebhookSignature(payload, signature) {
        if (!this.webhookSecret) {
            this.logger.error('RAZORPAY_WEBHOOK_SECRET is not defined. Cannot verify webhook.');
            return false;
        }
        const expectedSignature = crypto
            .createHmac('sha256', this.webhookSecret)
            .update(payload)
            .digest('hex');
        return expectedSignature === signature;
    }
};
exports.PaymentGatewayService = PaymentGatewayService;
exports.PaymentGatewayService = PaymentGatewayService = PaymentGatewayService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PaymentGatewayService);
//# sourceMappingURL=payment-gateway.service.js.map