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
exports.FineRulesController = void 0;
const permissions_decorator_1 = require("../../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../../core/guards/permissions.guard");
const api_paginated_response_decorator_1 = require("../../../../../core/utils/pagination/api-paginated-response.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const fine_rule_dto_1 = require("../../dto/fine-rule.dto");
const fine_rules_service_1 = require("../../services/fine-rules/fine-rules.service");
let FineRulesController = class FineRulesController {
    fineRulesService;
    constructor(fineRulesService) {
        this.fineRulesService = fineRulesService;
    }
    create(createDto) {
        return this.fineRulesService.create(createDto);
    }
    findAll(queryOptions) {
        return this.fineRulesService.findAll(queryOptions);
    }
    findOne(id) {
        return this.fineRulesService.findOne(id);
    }
    update(id, updateDto) {
        return this.fineRulesService.update(id, updateDto);
    }
    remove(id) {
        return this.fineRulesService.remove(id);
    }
};
exports.FineRulesController = FineRulesController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('create:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new fine rule' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fine_rule_dto_1.CreateFineRuleDto]),
    __metadata("design:returntype", void 0)
], FineRulesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('read:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all fine rules' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(fine_rule_dto_1.CreateFineRuleDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fine_rule_dto_1.FineRuleQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], FineRulesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('read:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific fine rule by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FineRulesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('update:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a fine rule' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, fine_rule_dto_1.UpdateFineRuleDto]),
    __metadata("design:returntype", void 0)
], FineRulesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('delete:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a fine rule' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FineRulesController.prototype, "remove", null);
exports.FineRulesController = FineRulesController = __decorate([
    (0, swagger_1.ApiTags)('Finance / Fine Rules'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('fine-rules'),
    __metadata("design:paramtypes", [fine_rules_service_1.FineRulesService])
], FineRulesController);
//# sourceMappingURL=fine-rules.controller.js.map