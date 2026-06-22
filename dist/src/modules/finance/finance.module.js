"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceModule = void 0;
const common_1 = require("@nestjs/common");
const fees_controller_1 = require("./controllers/fees/fees.controller");
const invoices_controller_1 = require("./controllers/invoices/invoices.controller");
const payments_controller_1 = require("./controllers/payments/payments.controller");
const expenses_module_1 = require("./expenses/expenses.module");
const fees_module_1 = require("./fees/fees.module");
const payments_module_1 = require("./payments/payments.module");
const payroll_module_1 = require("./payroll/payroll.module");
const fees_service_1 = require("./services/fees/fees.service");
const invoices_service_1 = require("./services/invoices/invoices.service");
const payments_service_1 = require("./services/payments/payments.service");
let FinanceModule = class FinanceModule {
};
exports.FinanceModule = FinanceModule;
exports.FinanceModule = FinanceModule = __decorate([
    (0, common_1.Module)({
        providers: [fees_service_1.FeesService, invoices_service_1.InvoicesService, payments_service_1.PaymentsService],
        controllers: [fees_controller_1.FeesController, invoices_controller_1.InvoicesController, payments_controller_1.PaymentsController],
        imports: [fees_module_1.FeesModule, payments_module_1.PaymentsModule, expenses_module_1.ExpensesModule, payroll_module_1.PayrollModule]
    })
], FinanceModule);
//# sourceMappingURL=finance.module.js.map