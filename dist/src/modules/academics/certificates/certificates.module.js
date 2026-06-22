"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificatesModule = void 0;
const common_1 = require("@nestjs/common");
const issued_certificates_controller_1 = require("./controllers/issued-certificates/issued-certificates.controller");
const templates_controller_1 = require("./controllers/templates/templates.controller");
const issued_certificates_service_1 = require("./services/issued-certificates/issued-certificates.service");
const templates_service_1 = require("./services/templates/templates.service");
let CertificatesModule = class CertificatesModule {
};
exports.CertificatesModule = CertificatesModule;
exports.CertificatesModule = CertificatesModule = __decorate([
    (0, common_1.Module)({
        providers: [templates_service_1.TemplatesService, issued_certificates_service_1.IssuedCertificatesService],
        controllers: [templates_controller_1.TemplatesController, issued_certificates_controller_1.IssuedCertificatesController]
    })
], CertificatesModule);
//# sourceMappingURL=certificates.module.js.map