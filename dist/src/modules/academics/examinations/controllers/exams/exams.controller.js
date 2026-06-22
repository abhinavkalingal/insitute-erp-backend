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
exports.ExamsController = void 0;
const permissions_decorator_1 = require("../../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../../core/guards/permissions.guard");
const api_paginated_response_decorator_1 = require("../../../../../core/utils/pagination/api-paginated-response.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const exam_dto_1 = require("../../dto/exam.dto");
const exams_service_1 = require("../../services/exams/exams.service");
let ExamsController = class ExamsController {
    examsService;
    constructor(examsService) {
        this.examsService = examsService;
    }
    createTerm(createDto) {
        return this.examsService.createTerm(createDto);
    }
    findAllTerms(queryOptions) {
        return this.examsService.findAllTerms(queryOptions);
    }
    findOneTerm(id) {
        return this.examsService.findOneTerm(id);
    }
    updateTerm(id, updateDto) {
        return this.examsService.updateTerm(id, updateDto);
    }
    removeTerm(id) {
        return this.examsService.removeTerm(id);
    }
    createExam(createDto) {
        return this.examsService.createExam(createDto);
    }
    findAllExams(queryOptions) {
        return this.examsService.findAllExams(queryOptions);
    }
    findOneExam(id) {
        return this.examsService.findOneExam(id);
    }
    updateExam(id, updateDto) {
        return this.examsService.updateExam(id, updateDto);
    }
    removeExam(id) {
        return this.examsService.removeExam(id);
    }
};
exports.ExamsController = ExamsController;
__decorate([
    (0, common_1.Post)('exam-terms'),
    (0, permissions_decorator_1.RequirePermissions)('create:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new exam term' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exam_dto_1.CreateExamTermDto]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "createTerm", null);
__decorate([
    (0, common_1.Get)('exam-terms'),
    (0, permissions_decorator_1.RequirePermissions)('read:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all exam terms' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(exam_dto_1.CreateExamTermDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exam_dto_1.ExamTermQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "findAllTerms", null);
__decorate([
    (0, common_1.Get)('exam-terms/:id'),
    (0, permissions_decorator_1.RequirePermissions)('read:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get exam term by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "findOneTerm", null);
__decorate([
    (0, common_1.Patch)('exam-terms/:id'),
    (0, permissions_decorator_1.RequirePermissions)('update:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an exam term (e.g. toggle isPublished)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, exam_dto_1.UpdateExamTermDto]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "updateTerm", null);
__decorate([
    (0, common_1.Delete)('exam-terms/:id'),
    (0, permissions_decorator_1.RequirePermissions)('delete:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an exam term' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "removeTerm", null);
__decorate([
    (0, common_1.Post)('exams'),
    (0, permissions_decorator_1.RequirePermissions)('create:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a specific exam paper' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exam_dto_1.CreateExamDto]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "createExam", null);
__decorate([
    (0, common_1.Get)('exams'),
    (0, permissions_decorator_1.RequirePermissions)('read:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all exam papers' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(exam_dto_1.CreateExamDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exam_dto_1.ExamQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "findAllExams", null);
__decorate([
    (0, common_1.Get)('exams/:id'),
    (0, permissions_decorator_1.RequirePermissions)('read:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get specific exam by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "findOneExam", null);
__decorate([
    (0, common_1.Patch)('exams/:id'),
    (0, permissions_decorator_1.RequirePermissions)('update:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an exam' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, exam_dto_1.UpdateExamDto]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "updateExam", null);
__decorate([
    (0, common_1.Delete)('exams/:id'),
    (0, permissions_decorator_1.RequirePermissions)('delete:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an exam' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "removeExam", null);
exports.ExamsController = ExamsController = __decorate([
    (0, swagger_1.ApiTags)('Academics / Exams'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [exams_service_1.ExamsService])
], ExamsController);
//# sourceMappingURL=exams.controller.js.map