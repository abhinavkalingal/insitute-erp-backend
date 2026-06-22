"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsModule = void 0;
const common_1 = require("@nestjs/common");
const subscription_plans_controller_1 = require("./controllers/subscription-plans/subscription-plans.controller");
const subscriptions_controller_1 = require("./controllers/subscriptions/subscriptions.controller");
const subscription_plans_service_1 = require("./services/subscription-plans/subscription-plans.service");
const subscriptions_service_1 = require("./services/subscriptions/subscriptions.service");
let SubscriptionsModule = class SubscriptionsModule {
};
exports.SubscriptionsModule = SubscriptionsModule;
exports.SubscriptionsModule = SubscriptionsModule = __decorate([
    (0, common_1.Module)({
        providers: [subscription_plans_service_1.SubscriptionPlansService, subscriptions_service_1.SubscriptionsService],
        controllers: [subscription_plans_controller_1.SubscriptionPlansController, subscriptions_controller_1.SubscriptionsController]
    })
], SubscriptionsModule);
//# sourceMappingURL=subscriptions.module.js.map