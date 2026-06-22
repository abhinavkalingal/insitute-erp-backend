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
exports.StudentFeeAssignmentsController = void 0;
const permissions_decorator_1 = require("../../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../../core/guards/permissions.guard");
const api_paginated_response_decorator_1 = require("../../../../../core/utils/pagination/api-paginated-response.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const assign_fee_dto_1 = require("../../dto/assign-fee.dto");
const student_fee_assignments_service_1 = require("../../services/student-fee-assignments/student-fee-assignments.service");
let StudentFeeAssignmentsController = class StudentFeeAssignmentsController {
    studentFeeAssignmentsService;
    constructor(studentFeeAssignmentsService) {
        this.studentFeeAssignmentsService = studentFeeAssignmentsService;
    }
    assignFee(assignDto) {
        return this.studentFeeAssignmentsService.assignFee(assignDto);
    }
    findAll(queryOptions) {
        return this.studentFeeAssignmentsService.findAll(queryOptions);
    }
    findOne(id) {
        return this.studentFeeAssignmentsService.findOne(id);
    }
};
exports.StudentFeeAssignmentsController = StudentFeeAssignmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('create:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign a fee structure to a student (Generates Invoice)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assign_fee_dto_1.AssignFeeDto]),
    __metadata("design:returntype", void 0)
], StudentFeeAssignmentsController.prototype, "assignFee", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('read:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all fee assignments / invoices' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(assign_fee_dto_1.AssignFeeDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assign_fee_dto_1.StudentFeeAssignmentQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], StudentFeeAssignmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('read:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific fee assignment / invoice by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentFeeAssignmentsController.prototype, "findOne", null);
exports.StudentFeeAssignmentsController = StudentFeeAssignmentsController = __decorate([
    (0, swagger_1.ApiTags)('Finance / Student Fee Assignments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('student-fee-assignments'),
    __metadata("design:paramtypes", [student_fee_assignments_service_1.StudentFeeAssignmentsService])
], StudentFeeAssignmentsController);
//# sourceMappingURL=student-fee-assignments.controller.js.map