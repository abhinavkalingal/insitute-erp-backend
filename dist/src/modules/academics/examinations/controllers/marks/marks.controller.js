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
exports.MarksController = void 0;
const permissions_decorator_1 = require("../../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../../core/guards/permissions.guard");
const api_paginated_response_decorator_1 = require("../../../../../core/utils/pagination/api-paginated-response.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const mark_dto_1 = require("../../dto/mark.dto");
const mark_dto_2 = require("../../dto/mark.dto");
const marks_service_1 = require("../../services/marks/marks.service");
let MarksController = class MarksController {
    marksService;
    constructor(marksService) {
        this.marksService = marksService;
    }
    bulkUpsert(bulkDto) {
        return this.marksService.bulkUpsertMarks(bulkDto);
    }
    findAll(queryOptions) {
        return this.marksService.findAll(queryOptions);
    }
};
exports.MarksController = MarksController;
__decorate([
    (0, common_1.Post)('bulk-upsert'),
    (0, permissions_decorator_1.RequirePermissions)('update:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk upsert marks for an exam' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mark_dto_1.BulkUpsertMarksDto]),
    __metadata("design:returntype", void 0)
], MarksController.prototype, "bulkUpsert", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('read:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all marks with pagination' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(mark_dto_2.StudentMarkDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mark_dto_1.MarkQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], MarksController.prototype, "findAll", null);
exports.MarksController = MarksController = __decorate([
    (0, swagger_1.ApiTags)('Academics / Marks'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('marks'),
    __metadata("design:paramtypes", [marks_service_1.MarksService])
], MarksController);
//# sourceMappingURL=marks.controller.js.map