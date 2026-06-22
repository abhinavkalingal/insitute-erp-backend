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
exports.FeeCategoriesController = void 0;
const permissions_decorator_1 = require("../../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../../core/guards/permissions.guard");
const api_paginated_response_decorator_1 = require("../../../../../core/utils/pagination/api-paginated-response.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const fee_category_dto_1 = require("../../dto/fee-category.dto");
const fee_categories_service_1 = require("../../services/fee-categories/fee-categories.service");
let FeeCategoriesController = class FeeCategoriesController {
    feeCategoriesService;
    constructor(feeCategoriesService) {
        this.feeCategoriesService = feeCategoriesService;
    }
    create(createDto) {
        return this.feeCategoriesService.create(createDto);
    }
    findAll(queryOptions) {
        return this.feeCategoriesService.findAll(queryOptions);
    }
    findOne(id) {
        return this.feeCategoriesService.findOne(id);
    }
    update(id, updateDto) {
        return this.feeCategoriesService.update(id, updateDto);
    }
    remove(id) {
        return this.feeCategoriesService.remove(id);
    }
};
exports.FeeCategoriesController = FeeCategoriesController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('create:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new fee category' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fee_category_dto_1.CreateFeeCategoryDto]),
    __metadata("design:returntype", void 0)
], FeeCategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('read:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all fee categories' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(fee_category_dto_1.CreateFeeCategoryDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fee_category_dto_1.FeeCategoryQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], FeeCategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('read:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific fee category by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeeCategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('update:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a fee category' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, fee_category_dto_1.UpdateFeeCategoryDto]),
    __metadata("design:returntype", void 0)
], FeeCategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('delete:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a fee category' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeeCategoriesController.prototype, "remove", null);
exports.FeeCategoriesController = FeeCategoriesController = __decorate([
    (0, swagger_1.ApiTags)('Finance / Fee Categories'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('fee-categories'),
    __metadata("design:paramtypes", [fee_categories_service_1.FeeCategoriesService])
], FeeCategoriesController);
//# sourceMappingURL=fee-categories.controller.js.map