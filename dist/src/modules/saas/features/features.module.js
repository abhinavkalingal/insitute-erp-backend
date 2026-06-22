"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturesModule = void 0;
const saas_enforcement_service_1 = require("../../../core/services/saas-enforcement.service");
const common_1 = require("@nestjs/common");
const plan_features_controller_1 = require("./controllers/plan-features/plan-features.controller");
const saas_features_controller_1 = require("./controllers/saas-features/saas-features.controller");
const plan_features_service_1 = require("./services/plan-features/plan-features.service");
const saas_features_service_1 = require("./services/saas-features/saas-features.service");
let FeaturesModule = class FeaturesModule {
};
exports.FeaturesModule = FeaturesModule;
exports.FeaturesModule = FeaturesModule = __decorate([
    (0, common_1.Module)({
        controllers: [saas_features_controller_1.SaasFeaturesController, plan_features_controller_1.PlanFeaturesController],
        providers: [saas_features_service_1.SaasFeaturesService, plan_features_service_1.PlanFeaturesService, saas_enforcement_service_1.SaasEnforcementService],
        exports: [saas_enforcement_service_1.SaasEnforcementService]
    })
], FeaturesModule);
//# sourceMappingURL=features.module.js.map