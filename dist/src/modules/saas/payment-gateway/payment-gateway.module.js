"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentGatewayModule = void 0;
const common_1 = require("@nestjs/common");
const saas_webhooks_controller_1 = require("./controllers/saas-webhooks/saas-webhooks.controller");
const payment_gateway_service_1 = require("./services/payment-gateway/payment-gateway.service");
let PaymentGatewayModule = class PaymentGatewayModule {
};
exports.PaymentGatewayModule = PaymentGatewayModule;
exports.PaymentGatewayModule = PaymentGatewayModule = __decorate([
    (0, common_1.Module)({
        controllers: [saas_webhooks_controller_1.SaasWebhooksController],
        providers: [payment_gateway_service_1.PaymentGatewayService],
        exports: [payment_gateway_service_1.PaymentGatewayService]
    })
], PaymentGatewayModule);
//# sourceMappingURL=payment-gateway.module.js.map