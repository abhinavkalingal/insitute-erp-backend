"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollModule = void 0;
const common_1 = require("@nestjs/common");
const payroll_slips_controller_1 = require("./controllers/payroll-slips/payroll-slips.controller");
const salary_structures_controller_1 = require("./controllers/salary-structures/salary-structures.controller");
const staff_loans_controller_1 = require("./controllers/staff-loans/staff-loans.controller");
const payroll_slips_service_1 = require("./services/payroll-slips/payroll-slips.service");
const salary_structures_service_1 = require("./services/salary-structures/salary-structures.service");
const staff_loans_service_1 = require("./services/staff-loans/staff-loans.service");
let PayrollModule = class PayrollModule {
};
exports.PayrollModule = PayrollModule;
exports.PayrollModule = PayrollModule = __decorate([
    (0, common_1.Module)({
        providers: [salary_structures_service_1.SalaryStructuresService, staff_loans_service_1.StaffLoansService, payroll_slips_service_1.PayrollSlipsService],
        controllers: [salary_structures_controller_1.SalaryStructuresController, staff_loans_controller_1.StaffLoansController, payroll_slips_controller_1.PayrollSlipsController]
    })
], PayrollModule);
//# sourceMappingURL=payroll.module.js.map