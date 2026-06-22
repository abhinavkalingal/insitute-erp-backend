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
exports.StudentsController = void 0;
const permissions_decorator_1 = require("../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../core/guards/permissions.guard");
const api_paginated_response_decorator_1 = require("../../core/utils/pagination/api-paginated-response.decorator");
const storage_service_1 = require("../storage/storage.service");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const create_student_dto_1 = require("./dto/create-student.dto");
const link_guardian_dto_1 = require("./dto/link-guardian.dto");
const student_query_options_dto_1 = require("./dto/student-query-options.dto");
const update_student_dto_1 = require("./dto/update-student.dto");
const students_service_1 = require("./students.service");
let StudentsController = class StudentsController {
    studentsService;
    storageService;
    constructor(studentsService, storageService) {
        this.studentsService = studentsService;
        this.storageService = storageService;
    }
    create(createStudentDto) {
        return this.studentsService.create(createStudentDto);
    }
    findAll(queryOptions) {
        return this.studentsService.findAll(queryOptions);
    }
    findOne(id) {
        return this.studentsService.findOne(id);
    }
    update(id, updateStudentDto) {
        return this.studentsService.update(id, updateStudentDto);
    }
    linkGuardian(id, linkGuardianDto) {
        return this.studentsService.linkGuardian(id, linkGuardianDto);
    }
    async uploadDocument(id, file) {
        if (!file) {
            throw new common_1.BadRequestException('No file provided');
        }
        const documentUrl = await this.storageService.uploadFile(file);
        return this.studentsService.uploadDocument(id, documentUrl, file.originalname, file.mimetype);
    }
    remove(id) {
        return this.studentsService.remove(id);
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('create:users'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new student (and User)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('read:users'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all students with pagination and filters' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(create_student_dto_1.CreateStudentDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_query_options_dto_1.StudentQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('read:users'),
    (0, swagger_1.ApiOperation)({ summary: 'Get student by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('update:users'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a student' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_student_dto_1.UpdateStudentDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/guardians'),
    (0, permissions_decorator_1.RequirePermissions)('update:users'),
    (0, swagger_1.ApiOperation)({ summary: 'Link a guardian to a student' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, link_guardian_dto_1.LinkGuardianDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "linkGuardian", null);
__decorate([
    (0, common_1.Post)(':id/documents'),
    (0, permissions_decorator_1.RequirePermissions)('update:users'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload a document for a student' }),
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
], StudentsController.prototype, "uploadDocument", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('delete:users'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a student and their User login' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "remove", null);
exports.StudentsController = StudentsController = __decorate([
    (0, swagger_1.ApiTags)('Students'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('students'),
    __metadata("design:paramtypes", [students_service_1.StudentsService,
        storage_service_1.StorageService])
], StudentsController);
//# sourceMappingURL=students.controller.js.map