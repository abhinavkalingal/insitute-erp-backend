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
exports.DataImportExportController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const permissions_decorator_1 = require("../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../core/guards/permissions.guard");
const data_import_export_service_1 = require("./data-import-export.service");
let DataImportExportController = class DataImportExportController {
    importExportService;
    constructor(importExportService) {
        this.importExportService = importExportService;
    }
    downloadTemplate(entity, res) {
        if (entity !== 'students') {
            throw new common_1.BadRequestException('Templates only available for students currently.');
        }
        const csv = this.importExportService.generateStudentTemplate();
        res.header('Content-Type', 'text/csv');
        res.attachment(`template_${entity}.csv`);
        return res.send(csv);
    }
    async importData(entity, file) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
        if (entity !== 'students') {
            throw new common_1.BadRequestException('Imports only available for students currently.');
        }
        return this.importExportService.importStudents(file.buffer);
    }
};
exports.DataImportExportController = DataImportExportController;
__decorate([
    (0, common_1.Get)('template/:entity'),
    (0, permissions_decorator_1.RequirePermissions)('manage:institute'),
    (0, swagger_1.ApiOperation)({ summary: 'Download a CSV template for an entity' }),
    __param(0, (0, common_1.Param)('entity')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DataImportExportController.prototype, "downloadTemplate", null);
__decorate([
    (0, common_1.Post)('import/:entity'),
    (0, permissions_decorator_1.RequirePermissions)('manage:institute'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk import data via CSV' }),
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
    __param(0, (0, common_1.Param)('entity')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DataImportExportController.prototype, "importData", null);
exports.DataImportExportController = DataImportExportController = __decorate([
    (0, swagger_1.ApiTags)('Data Import & Export'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('data-import-export'),
    __metadata("design:paramtypes", [data_import_export_service_1.DataImportExportService])
], DataImportExportController);
//# sourceMappingURL=data-import-export.controller.js.map