"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomDomainsModule = void 0;
const common_1 = require("@nestjs/common");
const features_module_1 = require("../features/features.module");
const custom_domains_controller_1 = require("./controllers/custom-domains/custom-domains.controller");
const custom_domains_service_1 = require("./services/custom-domains/custom-domains.service");
let CustomDomainsModule = class CustomDomainsModule {
};
exports.CustomDomainsModule = CustomDomainsModule;
exports.CustomDomainsModule = CustomDomainsModule = __decorate([
    (0, common_1.Module)({
        imports: [features_module_1.FeaturesModule],
        providers: [custom_domains_service_1.CustomDomainsService],
        controllers: [custom_domains_controller_1.CustomDomainsController]
    })
], CustomDomainsModule);
//# sourceMappingURL=custom-domains.module.js.map