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
exports.StaffController = void 0;
const permissions_decorator_1 = require("../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../core/guards/permissions.guard");
const api_paginated_response_decorator_1 = require("../../core/utils/pagination/api-paginated-response.decorator");
const storage_service_1 = require("../storage/storage.service");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const create_staff_dto_1 = require("./dto/create-staff.dto");
const staff_query_options_dto_1 = require("./dto/staff-query-options.dto");
const update_staff_dto_1 = require("./dto/update-staff.dto");
const staff_service_1 = require("./staff.service");
let StaffController = class StaffController {
    staffService;
    storageService;
    constructor(staffService, storageService) {
        this.staffService = staffService;
        this.storageService = storageService;
    }
    create(createStaffDto) {
        return this.staffService.create(createStaffDto);
    }
    findAll(queryOptions) {
        return this.staffService.findAll(queryOptions);
    }
    findOne(id) {
        return this.staffService.findOne(id);
    }
    update(id, updateStaffDto) {
        return this.staffService.update(id, updateStaffDto);
    }
    async uploadDocument(id, file) {
        if (!file) {
            throw new common_1.BadRequestException('No file provided');
        }
        const documentUrl = await this.storageService.uploadFile(file);
        return this.staffService.uploadDocument(id, documentUrl, file.originalname, file.mimetype);
    }
    remove(id) {
        return this.staffService.remove(id);
    }
};
exports.StaffController = StaffController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('create:users'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new staff member (and User)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_staff_dto_1.CreateStaffDto]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('read:users'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all staff members with pagination and filters' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(create_staff_dto_1.CreateStaffDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [staff_query_options_dto_1.StaffQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('read:users'),
    (0, swagger_1.ApiOperation)({ summary: 'Get staff member by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('update:users'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a staff member' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_staff_dto_1.UpdateStaffDto]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/documents'),
    (0, permissions_decorator_1.RequirePermissions)('update:users'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload a document for a staff member' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "uploadDocument", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('delete:users'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a staff member and their User login' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "remove", null);
exports.StaffController = StaffController = __decorate([
    (0, swagger_1.ApiTags)('Staff'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('staff'),
    __metadata("design:paramtypes", [staff_service_1.StaffService,
        storage_service_1.StorageService])
], StaffController);
//# sourceMappingURL=staff.controller.js.map