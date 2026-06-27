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
exports.PlacementsController = void 0;
const common_1 = require("@nestjs/common");
const placements_service_1 = require("./placements.service");
const client_1 = require("@prisma/client");
let PlacementsController = class PlacementsController {
    placementsService;
    constructor(placementsService) {
        this.placementsService = placementsService;
    }
    createCompany(data) {
        return this.placementsService.createCompany(data);
    }
    getCompanies() {
        return this.placementsService.getCompanies();
    }
    updateCompany(id, data) {
        return this.placementsService.updateCompany(id, data);
    }
    deleteCompany(id) {
        return this.placementsService.deleteCompany(id);
    }
    createDrive(data) {
        return this.placementsService.createDrive(data);
    }
    getDrives() {
        return this.placementsService.getDrives();
    }
    updateDrive(id, data) {
        return this.placementsService.updateDrive(id, data);
    }
    deleteDrive(id) {
        return this.placementsService.deleteDrive(id);
    }
    createJobPosting(data) {
        return this.placementsService.createJobPosting(data);
    }
    getJobPostings(driveId) {
        return this.placementsService.getJobPostings(driveId);
    }
    updateJobPosting(id, data) {
        return this.placementsService.updateJobPosting(id, data);
    }
    deleteJobPosting(id) {
        return this.placementsService.deleteJobPosting(id);
    }
    getApplications(jobId) {
        return this.placementsService.getApplications(jobId);
    }
    updateApplicationStatus(id, status) {
        return this.placementsService.updateApplicationStatus(id, status);
    }
};
exports.PlacementsController = PlacementsController;
__decorate([
    (0, common_1.Post)('companies'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlacementsController.prototype, "createCompany", null);
__decorate([
    (0, common_1.Get)('companies'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlacementsController.prototype, "getCompanies", null);
__decorate([
    (0, common_1.Patch)('companies/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PlacementsController.prototype, "updateCompany", null);
__decorate([
    (0, common_1.Delete)('companies/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlacementsController.prototype, "deleteCompany", null);
__decorate([
    (0, common_1.Post)('drives'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlacementsController.prototype, "createDrive", null);
__decorate([
    (0, common_1.Get)('drives'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlacementsController.prototype, "getDrives", null);
__decorate([
    (0, common_1.Patch)('drives/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PlacementsController.prototype, "updateDrive", null);
__decorate([
    (0, common_1.Delete)('drives/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlacementsController.prototype, "deleteDrive", null);
__decorate([
    (0, common_1.Post)('jobs'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlacementsController.prototype, "createJobPosting", null);
__decorate([
    (0, common_1.Get)('jobs'),
    __param(0, (0, common_1.Query)('driveId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlacementsController.prototype, "getJobPostings", null);
__decorate([
    (0, common_1.Patch)('jobs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PlacementsController.prototype, "updateJobPosting", null);
__decorate([
    (0, common_1.Delete)('jobs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlacementsController.prototype, "deleteJobPosting", null);
__decorate([
    (0, common_1.Get)('jobs/:id/applications'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlacementsController.prototype, "getApplications", null);
__decorate([
    (0, common_1.Patch)('applications/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PlacementsController.prototype, "updateApplicationStatus", null);
exports.PlacementsController = PlacementsController = __decorate([
    (0, common_1.Controller)('placements'),
    __metadata("design:paramtypes", [placements_service_1.PlacementsService])
], PlacementsController);
//# sourceMappingURL=placements.controller.js.map