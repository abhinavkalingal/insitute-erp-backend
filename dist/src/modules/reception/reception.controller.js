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
exports.ReceptionController = void 0;
const common_1 = require("@nestjs/common");
const reception_service_1 = require("./reception.service");
const client_1 = require("@prisma/client");
let ReceptionController = class ReceptionController {
    receptionService;
    constructor(receptionService) {
        this.receptionService = receptionService;
    }
    createVisitor(data) {
        return this.receptionService.createVisitor(data);
    }
    getVisitors() {
        return this.receptionService.getVisitors();
    }
    updateVisitor(id, data) {
        return this.receptionService.updateVisitor(id, data);
    }
    deleteVisitor(id) {
        return this.receptionService.deleteVisitor(id);
    }
    createEnquiry(data) {
        return this.receptionService.createEnquiry(data);
    }
    getEnquiries() {
        return this.receptionService.getEnquiries();
    }
    updateEnquiry(id, data) {
        return this.receptionService.updateEnquiry(id, data);
    }
    deleteEnquiry(id) {
        return this.receptionService.deleteEnquiry(id);
    }
    createAppointment(data) {
        return this.receptionService.createAppointment(data);
    }
    getAppointments() {
        return this.receptionService.getAppointments();
    }
    updateAppointment(id, data) {
        return this.receptionService.updateAppointment(id, data);
    }
    deleteAppointment(id) {
        return this.receptionService.deleteAppointment(id);
    }
};
exports.ReceptionController = ReceptionController;
__decorate([
    (0, common_1.Post)('visitors'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReceptionController.prototype, "createVisitor", null);
__decorate([
    (0, common_1.Get)('visitors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReceptionController.prototype, "getVisitors", null);
__decorate([
    (0, common_1.Patch)('visitors/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ReceptionController.prototype, "updateVisitor", null);
__decorate([
    (0, common_1.Delete)('visitors/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReceptionController.prototype, "deleteVisitor", null);
__decorate([
    (0, common_1.Post)('enquiries'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReceptionController.prototype, "createEnquiry", null);
__decorate([
    (0, common_1.Get)('enquiries'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReceptionController.prototype, "getEnquiries", null);
__decorate([
    (0, common_1.Patch)('enquiries/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ReceptionController.prototype, "updateEnquiry", null);
__decorate([
    (0, common_1.Delete)('enquiries/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReceptionController.prototype, "deleteEnquiry", null);
__decorate([
    (0, common_1.Post)('appointments'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReceptionController.prototype, "createAppointment", null);
__decorate([
    (0, common_1.Get)('appointments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReceptionController.prototype, "getAppointments", null);
__decorate([
    (0, common_1.Patch)('appointments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ReceptionController.prototype, "updateAppointment", null);
__decorate([
    (0, common_1.Delete)('appointments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReceptionController.prototype, "deleteAppointment", null);
exports.ReceptionController = ReceptionController = __decorate([
    (0, common_1.Controller)('reception'),
    __metadata("design:paramtypes", [reception_service_1.ReceptionService])
], ReceptionController);
//# sourceMappingURL=reception.controller.js.map