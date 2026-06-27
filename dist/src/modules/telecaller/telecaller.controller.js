"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelecallerController = void 0;
const common_1 = require("@nestjs/common");
const telecaller_service_1 = require("./telecaller.service");
const client_1 = require("@prisma/client");
let TelecallerController = class TelecallerController {
    telecallerService;
    constructor(telecallerService) {
        this.telecallerService = telecallerService;
    }
    createLead(data) {
        return this.telecallerService.createLead(data);
    }
    getLeads() {
        return this.telecallerService.getLeads();
    }
    getLeadById(id) {
        return this.telecallerService.getLeadById(id);
    }
    updateLeadStatus(id, status) {
        return this.telecallerService.updateLeadStatus(id, status);
    }
    addFollowUp(id, data) {
        return this.telecallerService.addFollowUp(id, data);
    }
    deleteLead(id) {
        return this.telecallerService.deleteLead(id);
    }
    bulkAssignLeads(leadIds, assigneeId) {
        return this.telecallerService.bulkAssignLeads(leadIds, assigneeId);
    }
};
exports.TelecallerController = TelecallerController;
__decorate([
    (0, common_1.Post)('leads'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TelecallerController.prototype, "createLead", null);
__decorate([
    (0, common_1.Get)('leads'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TelecallerController.prototype, "getLeads", null);
__decorate([
    (0, common_1.Get)('leads/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TelecallerController.prototype, "getLeadById", null);
__decorate([
    (0, common_1.Patch)('leads/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TelecallerController.prototype, "updateLeadStatus", null);
__decorate([
    (0, common_1.Post)('leads/:id/follow-ups'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TelecallerController.prototype, "addFollowUp", null);
__decorate([
    (0, common_1.Delete)('leads/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TelecallerController.prototype, "deleteLead", null);
__decorate([
    (0, common_1.Patch)('leads/bulk-assign'),
    __param(0, (0, common_1.Body)('leadIds')),
    __param(1, (0, common_1.Body)('assigneeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", void 0)
], TelecallerController.prototype, "bulkAssignLeads", null);
exports.TelecallerController = TelecallerController = __decorate([
    (0, common_1.Controller)('telecaller'),
    __metadata("design:paramtypes", [telecaller_service_1.TelecallerService])
], TelecallerController);
//# sourceMappingURL=telecaller.controller.js.map