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
exports.StaffLoansController = void 0;
const permissions_decorator_1 = require("../../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../../core/guards/permissions.guard");
const api_paginated_response_decorator_1 = require("../../../../../core/utils/pagination/api-paginated-response.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const staff_loan_dto_1 = require("../../dto/staff-loan.dto");
const staff_loans_service_1 = require("../../services/staff-loans/staff-loans.service");
let StaffLoansController = class StaffLoansController {
    staffLoansService;
    constructor(staffLoansService) {
        this.staffLoansService = staffLoansService;
    }
    create(createDto) {
        return this.staffLoansService.create(createDto);
    }
    findAll(queryOptions) {
        return this.staffLoansService.findAll(queryOptions);
    }
    findOne(id) {
        return this.staffLoansService.findOne(id);
    }
    update(id, updateDto) {
        return this.staffLoansService.update(id, updateDto);
    }
    remove(id) {
        return this.staffLoansService.remove(id);
    }
};
exports.StaffLoansController = StaffLoansController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('create:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Issue a new loan to a staff member' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [staff_loan_dto_1.CreateStaffLoanDto]),
    __metadata("design:returntype", void 0)
], StaffLoansController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('read:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all staff loans' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(staff_loan_dto_1.CreateStaffLoanDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [staff_loan_dto_1.StaffLoanQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], StaffLoansController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('read:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific staff loan by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaffLoansController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('update:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a staff loan (e.g., mark PAID_OFF manually)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, staff_loan_dto_1.UpdateStaffLoanDto]),
    __metadata("design:returntype", void 0)
], StaffLoansController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('delete:finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a staff loan' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaffLoansController.prototype, "remove", null);
exports.StaffLoansController = StaffLoansController = __decorate([
    (0, swagger_1.ApiTags)('Finance / Payroll / Staff Loans'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('staff-loans'),
    __metadata("design:paramtypes", [staff_loans_service_1.StaffLoansService])
], StaffLoansController);
//# sourceMappingURL=staff-loans.controller.js.map