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
exports.InstitutesController = void 0;
const permissions_decorator_1 = require("../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../core/guards/permissions.guard");
const storage_service_1 = require("../storage/storage.service");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const create_institute_dto_1 = require("./dto/create-institute.dto");
const institute_query_options_dto_1 = require("./dto/institute-query-options.dto");
const update_institute_dto_1 = require("./dto/update-institute.dto");
const institutes_service_1 = require("./institutes.service");
let InstitutesController = class InstitutesController {
    institutesService;
    storageService;
    constructor(institutesService, storageService) {
        this.institutesService = institutesService;
        this.storageService = storageService;
    }
    create(createInstituteDto) {
        return this.institutesService.create(createInstituteDto);
    }
    findAll(queryOptions) {
        return this.institutesService.findAll(queryOptions);
    }
    findOne(id) {
        return this.institutesService.findOne(id);
    }
    update(id, updateInstituteDto) {
        return this.institutesService.update(id, updateInstituteDto);
    }
    async uploadLogo(id, file) {
        if (!file) {
            throw new common_1.BadRequestException('No file provided');
        }
        const logoUrl = await this.storageService.uploadFile(file);
        return this.institutesService.updateLogo(id, logoUrl);
    }
    remove(id) {
        return this.institutesService.remove(id);
    }
};
exports.InstitutesController = InstitutesController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('create:institutes'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new institute' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_institute_dto_1.CreateInstituteDto]),
    __metadata("design:returntype", void 0)
], InstitutesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('read:institutes'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all institutes with pagination and filters' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [institute_query_options_dto_1.InstituteQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], InstitutesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('read:institutes'),
    (0, swagger_1.ApiOperation)({ summary: 'Get institute by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InstitutesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('update:institutes'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an institute (including profile and settings)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_institute_dto_1.UpdateInstituteDto]),
    __metadata("design:returntype", void 0)
], InstitutesController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/logo'),
    (0, permissions_decorator_1.RequirePermissions)('update:institutes'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload an institute logo' }),
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
], InstitutesController.prototype, "uploadLogo", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('delete:institutes'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete an institute' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InstitutesController.prototype, "remove", null);
exports.InstitutesController = InstitutesController = __decorate([
    (0, swagger_1.ApiTags)('Institutes'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('institutes'),
    __metadata("design:paramtypes", [institutes_service_1.InstitutesService,
        storage_service_1.StorageService])
], InstitutesController);
//# sourceMappingURL=institutes.controller.js.map