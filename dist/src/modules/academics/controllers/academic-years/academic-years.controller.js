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
exports.AcademicYearsController = void 0;
const permissions_decorator_1 = require("../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../core/guards/permissions.guard");
const api_paginated_response_decorator_1 = require("../../../../core/utils/pagination/api-paginated-response.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const academic_year_dto_1 = require("../../dto/academic-year.dto");
const academic_years_service_1 = require("../../services/academic-years/academic-years.service");
let AcademicYearsController = class AcademicYearsController {
    academicYearsService;
    constructor(academicYearsService) {
        this.academicYearsService = academicYearsService;
    }
    create(createDto) {
        return this.academicYearsService.create(createDto);
    }
    findAll(queryOptions) {
        return this.academicYearsService.findAll(queryOptions);
    }
    findOne(id) {
        return this.academicYearsService.findOne(id);
    }
    update(id, updateDto) {
        return this.academicYearsService.update(id, updateDto);
    }
    remove(id) {
        return this.academicYearsService.remove(id);
    }
};
exports.AcademicYearsController = AcademicYearsController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('create:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new academic year' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [academic_year_dto_1.CreateAcademicYearDto]),
    __metadata("design:returntype", void 0)
], AcademicYearsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('read:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all academic years with pagination' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(academic_year_dto_1.CreateAcademicYearDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [academic_year_dto_1.AcademicYearQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], AcademicYearsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('read:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get academic year by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AcademicYearsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('update:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an academic year' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, academic_year_dto_1.UpdateAcademicYearDto]),
    __metadata("design:returntype", void 0)
], AcademicYearsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('delete:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an academic year' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AcademicYearsController.prototype, "remove", null);
exports.AcademicYearsController = AcademicYearsController = __decorate([
    (0, swagger_1.ApiTags)('Academics / Academic Years'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('academic-years'),
    __metadata("design:paramtypes", [academic_years_service_1.AcademicYearsService])
], AcademicYearsController);
//# sourceMappingURL=academic-years.controller.js.map