"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeesModule = void 0;
const common_1 = require("@nestjs/common");
const fee_categories_controller_1 = require("./controllers/fee-categories/fee-categories.controller");
const fee_discounts_controller_1 = require("./controllers/fee-discounts/fee-discounts.controller");
const fee_structures_controller_1 = require("./controllers/fee-structures/fee-structures.controller");
const fine_rules_controller_1 = require("./controllers/fine-rules/fine-rules.controller");
const student_fee_assignments_controller_1 = require("./controllers/student-fee-assignments/student-fee-assignments.controller");
const fee_categories_service_1 = require("./services/fee-categories/fee-categories.service");
const fee_discounts_service_1 = require("./services/fee-discounts/fee-discounts.service");
const fee_structures_service_1 = require("./services/fee-structures/fee-structures.service");
const fine_rules_service_1 = require("./services/fine-rules/fine-rules.service");
const student_fee_assignments_service_1 = require("./services/student-fee-assignments/student-fee-assignments.service");
let FeesModule = class FeesModule {
};
exports.FeesModule = FeesModule;
exports.FeesModule = FeesModule = __decorate([
    (0, common_1.Module)({
        providers: [
            fee_categories_service_1.FeeCategoriesService,
            fee_structures_service_1.FeeStructuresService,
            fee_discounts_service_1.FeeDiscountsService,
            fine_rules_service_1.FineRulesService,
            student_fee_assignments_service_1.StudentFeeAssignmentsService,
        ],
        controllers: [
            fee_categories_controller_1.FeeCategoriesController,
            fee_structures_controller_1.FeeStructuresController,
            fee_discounts_controller_1.FeeDiscountsController,
            fine_rules_controller_1.FineRulesController,
            student_fee_assignments_controller_1.StudentFeeAssignmentsController,
        ]
    })
], FeesModule);
//# sourceMappingURL=fees.module.js.map