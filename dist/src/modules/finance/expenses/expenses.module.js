"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesModule = void 0;
const common_1 = require("@nestjs/common");
const expense_categories_controller_1 = require("./controllers/expense-categories/expense-categories.controller");
const expenses_controller_1 = require("./controllers/expenses/expenses.controller");
const vendors_controller_1 = require("./controllers/vendors/vendors.controller");
const expense_categories_service_1 = require("./services/expense-categories/expense-categories.service");
const expenses_service_1 = require("./services/expenses/expenses.service");
const vendors_service_1 = require("./services/vendors/vendors.service");
let ExpensesModule = class ExpensesModule {
};
exports.ExpensesModule = ExpensesModule;
exports.ExpensesModule = ExpensesModule = __decorate([
    (0, common_1.Module)({
        providers: [vendors_service_1.VendorsService, expense_categories_service_1.ExpenseCategoriesService, expenses_service_1.ExpensesService],
        controllers: [vendors_controller_1.VendorsController, expense_categories_controller_1.ExpenseCategoriesController, expenses_controller_1.ExpensesController]
    })
], ExpensesModule);
//# sourceMappingURL=expenses.module.js.map