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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SaasWebhooksController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaasWebhooksController = void 0;
const prisma_master_service_1 = require("../../../../../infrastructure/database/prisma-master.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const payment_gateway_service_1 = require("../../services/payment-gateway/payment-gateway.service");
let SaasWebhooksController = SaasWebhooksController_1 = class SaasWebhooksController {
    paymentGatewayService;
    prisma;
    logger = new common_1.Logger(SaasWebhooksController_1.name);
    constructor(paymentGatewayService, prisma) {
        this.paymentGatewayService = paymentGatewayService;
        this.prisma = prisma;
    }
    async handleRazorpayWebhook(signature, req, res) {
        if (!signature) {
            throw new common_1.ForbiddenException('Missing Razorpay Signature');
        }
        const payloadString = JSON.stringify(req.body);
        const isValid = this.paymentGatewayService.verifyWebhookSignature(payloadString, signature);
        if (!isValid) {
            this.logger.error('Invalid Razorpay Webhook Signature');
            throw new common_1.ForbiddenException('Invalid Signature');
        }
        const event = req.body.event;
        const paymentEntity = req.body.payload?.payment?.entity;
        if (!paymentEntity) {
            return res.status(400).send('Missing payment entity');
        }
        const gatewayOrderId = paymentEntity.order_id;
        const transactionId = paymentEntity.id;
        if (!gatewayOrderId) {
            return res.status(400).send('Missing order_id');
        }
        const saasPayment = await this.prisma.saasPayment.findFirst({
            where: { gatewayOrderId }
        });
        if (!saasPayment) {
            this.logger.warn(`Received webhook for unknown order_id: ${gatewayOrderId}`);
            return res.status(200).send('OK');
        }
        try {
            if (event === 'payment.captured') {
                await this.prisma.$transaction(async (tx) => {
                    await tx.saasPayment.update({
                        where: { id: saasPayment.id },
                        data: { status: 'SUCCESS', transactionId, metadata: req.body }
                    });
                    const invoice = await tx.saasInvoice.update({
                        where: { id: saasPayment.invoiceId },
                        data: { status: 'PAID', paidAt: new Date() }
                    });
                    if (invoice.subscriptionId) {
                        await tx.subscription.update({
                            where: { id: invoice.subscriptionId },
                            data: { status: 'ACTIVE' }
                        });
                    }
                });
                this.logger.log(`Payment captured successfully for invoice ${saasPayment.invoiceId}`);
            }
            else if (event === 'payment.failed') {
                await this.prisma.saasPayment.update({
                    where: { id: saasPayment.id },
                    data: { status: 'FAILED', transactionId, metadata: req.body }
                });
                this.logger.log(`Payment failed for invoice ${saasPayment.invoiceId}`);
            }
            return res.status(200).send({ status: 'ok' });
        }
        catch (error) {
            this.logger.error(`Error processing webhook: ${error.message}`);
            return res.status(500).send('Internal Server Error');
        }
    }
};
exports.SaasWebhooksController = SaasWebhooksController;
__decorate([
    (0, common_1.Post)('razorpay'),
    (0, swagger_1.ApiOperation)({ summary: 'Receive Razorpay Webhooks (payment.captured, payment.failed)' }),
    __param(0, (0, common_1.Headers)('x-razorpay-signature')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SaasWebhooksController.prototype, "handleRazorpayWebhook", null);
exports.SaasWebhooksController = SaasWebhooksController = SaasWebhooksController_1 = __decorate([
    (0, swagger_1.ApiTags)('SaaS / Webhooks'),
    (0, common_1.Controller)('saas/billing/webhooks'),
    __metadata("design:paramtypes", [payment_gateway_service_1.PaymentGatewayService,
        prisma_master_service_1.PrismaMasterService])
], SaasWebhooksController);
//# sourceMappingURL=saas-webhooks.controller.js.map