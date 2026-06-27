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
exports.DirectorController = void 0;
const common_1 = require("@nestjs/common");
const director_service_1 = require("./director.service");
const client_1 = require("@prisma/client");
let DirectorController = class DirectorController {
    directorService;
    constructor(directorService) {
        this.directorService = directorService;
    }
    createApproval(data) {
        return this.directorService.createApproval(data);
    }
    getApprovals() {
        return this.directorService.getApprovals();
    }
    updateApproval(id, data) {
        return this.directorService.updateApproval(id, data);
    }
    deleteApproval(id) {
        return this.directorService.deleteApproval(id);
    }
};
exports.DirectorController = DirectorController;
__decorate([
    (0, common_1.Post)('approvals'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DirectorController.prototype, "createApproval", null);
__decorate([
    (0, common_1.Get)('approvals'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DirectorController.prototype, "getApprovals", null);
__decorate([
    (0, common_1.Patch)('approvals/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DirectorController.prototype, "updateApproval", null);
__decorate([
    (0, common_1.Delete)('approvals/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DirectorController.prototype, "deleteApproval", null);
exports.DirectorController = DirectorController = __decorate([
    (0, common_1.Controller)('director'),
    __metadata("design:paramtypes", [director_service_1.DirectorService])
], DirectorController);
//# sourceMappingURL=director.controller.js.map