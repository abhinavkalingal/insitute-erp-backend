"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingModule = void 0;
const common_1 = require("@nestjs/common");
const payment_gateway_module_1 = require("../payment-gateway/payment-gateway.module");
const saas_invoices_controller_1 = require("./controllers/saas-invoices/saas-invoices.controller");
const saas_payments_controller_1 = require("./controllers/saas-payments/saas-payments.controller");
const saas_invoices_service_1 = require("./services/saas-invoices/saas-invoices.service");
const saas_payments_service_1 = require("./services/saas-payments/saas-payments.service");
let BillingModule = class BillingModule {
};
exports.BillingModule = BillingModule;
exports.BillingModule = BillingModule = __decorate([
    (0, common_1.Module)({
        imports: [payment_gateway_module_1.PaymentGatewayModule],
        providers: [saas_invoices_service_1.SaasInvoicesService, saas_payments_service_1.SaasPaymentsService],
        controllers: [saas_invoices_controller_1.SaasInvoicesController, saas_payments_controller_1.SaasPaymentsController]
    })
], BillingModule);
//# sourceMappingURL=billing.module.js.map