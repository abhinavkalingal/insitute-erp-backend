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
exports.FeesController = void 0;
const permissions_decorator_1 = require("../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../core/guards/permissions.guard");
const api_paginated_response_decorator_1 = require("../../../../core/utils/pagination/api-paginated-response.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const fee_dto_1 = require("../../dto/fee.dto");
const fees_service_1 = require("../../services/fees/fees.service");
let FeesController = class FeesController {
    feesService;
    constructor(feesService) {
        this.feesService = feesService;
    }
    createCategory(createDto) {
        return this.feesService.createCategory(createDto);
    }
    findAllCategories(queryOptions) {
        return this.feesService.findAllCategories(queryOptions);
    }
    findOneCategory(id) {
        return this.feesService.findOneCategory(id);
    }
    updateCategory(id, updateDto) {
        return this.feesService.updateCategory(id, updateDto);
    }
    removeCategory(id) {
        return this.feesService.removeCategory(id);
    }
    createStructure(createDto) {
        return this.feesService.createStructure(createDto);
    }
    findAllStructures(queryOptions) {
        return this.feesService.findAllStructures(queryOptions);
    }
    findOneStructure(id) {
        return this.feesService.findOneStructure(id);
    }
    updateStructure(id, updateDto) {
        return this.feesService.updateStructure(id, updateDto);
    }
    removeStructure(id) {
        return this.feesService.removeStructure(id);
    }
};
exports.FeesController = FeesController;
__decorate([
    (0, common_1.Post)('categories'),
    (0, permissions_decorator_1.RequirePermissions)('create:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a fee category' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fee_dto_1.CreateFeeCategoryDto]),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)('categories'),
    (0, permissions_decorator_1.RequirePermissions)('read:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all fee categories' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(fee_dto_1.CreateFeeCategoryDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fee_dto_1.FeeCategoryQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "findAllCategories", null);
__decorate([
    (0, common_1.Get)('categories/:id'),
    (0, permissions_decorator_1.RequirePermissions)('read:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get fee category by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "findOneCategory", null);
__decorate([
    (0, common_1.Patch)('categories/:id'),
    (0, permissions_decorator_1.RequirePermissions)('update:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Update fee category' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, fee_dto_1.UpdateFeeCategoryDto]),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)('categories/:id'),
    (0, permissions_decorator_1.RequirePermissions)('delete:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete fee category' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "removeCategory", null);
__decorate([
    (0, common_1.Post)('structures'),
    (0, permissions_decorator_1.RequirePermissions)('create:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a fee structure' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fee_dto_1.CreateFeeStructureDto]),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "createStructure", null);
__decorate([
    (0, common_1.Get)('structures'),
    (0, permissions_decorator_1.RequirePermissions)('read:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all fee structures' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(fee_dto_1.CreateFeeStructureDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fee_dto_1.FeeStructureQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "findAllStructures", null);
__decorate([
    (0, common_1.Get)('structures/:id'),
    (0, permissions_decorator_1.RequirePermissions)('read:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get fee structure by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "findOneStructure", null);
__decorate([
    (0, common_1.Patch)('structures/:id'),
    (0, permissions_decorator_1.RequirePermissions)('update:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Update fee structure' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, fee_dto_1.UpdateFeeStructureDto]),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "updateStructure", null);
__decorate([
    (0, common_1.Delete)('structures/:id'),
    (0, permissions_decorator_1.RequirePermissions)('delete:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete fee structure' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "removeStructure", null);
exports.FeesController = FeesController = __decorate([
    (0, swagger_1.ApiTags)('Finance / Fees'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('fees'),
    __metadata("design:paramtypes", [fees_service_1.FeesService])
], FeesController);
//# sourceMappingURL=fees.controller.js.map