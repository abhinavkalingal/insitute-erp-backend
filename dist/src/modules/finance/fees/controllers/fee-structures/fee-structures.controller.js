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
exports.FeeStructuresController = void 0;
const permissions_decorator_1 = require("../../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../../core/guards/permissions.guard");
const api_paginated_response_decorator_1 = require("../../../../../core/utils/pagination/api-paginated-response.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const fee_structure_dto_1 = require("../../dto/fee-structure.dto");
const fee_structures_service_1 = require("../../services/fee-structures/fee-structures.service");
let FeeStructuresController = class FeeStructuresController {
    feeStructuresService;
    constructor(feeStructuresService) {
        this.feeStructuresService = feeStructuresService;
    }
    create(createDto) {
        return this.feeStructuresService.create(createDto);
    }
    findAll(queryOptions) {
        return this.feeStructuresService.findAll(queryOptions);
    }
    findOne(id) {
        return this.feeStructuresService.findOne(id);
    }
    update(id, updateDto) {
        return this.feeStructuresService.update(id, updateDto);
    }
    remove(id) {
        return this.feeStructuresService.remove(id);
    }
};
exports.FeeStructuresController = FeeStructuresController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('create:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new fee structure' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fee_structure_dto_1.CreateFeeStructureDto]),
    __metadata("design:returntype", void 0)
], FeeStructuresController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('read:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all fee structures' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(fee_structure_dto_1.CreateFeeStructureDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fee_structure_dto_1.FeeStructureQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], FeeStructuresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('read:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific fee structure by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeeStructuresController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('update:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a fee structure' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, fee_structure_dto_1.UpdateFeeStructureDto]),
    __metadata("design:returntype", void 0)
], FeeStructuresController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('delete:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a fee structure' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeeStructuresController.prototype, "remove", null);
exports.FeeStructuresController = FeeStructuresController = __decorate([
    (0, swagger_1.ApiTags)('Finance / Fee Structures'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('fee-structures'),
    __metadata("design:paramtypes", [fee_structures_service_1.FeeStructuresService])
], FeeStructuresController);
//# sourceMappingURL=fee-structures.controller.js.map