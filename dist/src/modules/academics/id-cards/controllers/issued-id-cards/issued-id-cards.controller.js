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
exports.IssuedIdCardsController = void 0;
const permissions_decorator_1 = require("../../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../../core/guards/permissions.guard");
const api_paginated_response_decorator_1 = require("../../../../../core/utils/pagination/api-paginated-response.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const issue_id_card_dto_1 = require("../../dto/issue-id-card.dto");
const issued_id_cards_service_1 = require("../../services/issued-id-cards/issued-id-cards.service");
let IssuedIdCardsController = class IssuedIdCardsController {
    issuedIdCardsService;
    constructor(issuedIdCardsService) {
        this.issuedIdCardsService = issuedIdCardsService;
    }
    issue(issueDto) {
        return this.issuedIdCardsService.issue(issueDto);
    }
    findAll(queryOptions) {
        return this.issuedIdCardsService.findAll(queryOptions);
    }
    revokeCard(id) {
        return this.issuedIdCardsService.revokeCard(id);
    }
    verifyCard(cardNumber) {
        return this.issuedIdCardsService.verifyCard(cardNumber);
    }
};
exports.IssuedIdCardsController = IssuedIdCardsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('create:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Issue a new ID card' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [issue_id_card_dto_1.IssueIdCardDto]),
    __metadata("design:returntype", void 0)
], IssuedIdCardsController.prototype, "issue", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('read:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all issued ID cards' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(issue_id_card_dto_1.IssueIdCardDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [issue_id_card_dto_1.IssuedIdCardQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], IssuedIdCardsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id/revoke'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('update:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Revoke an ID Card (e.g., if lost or stolen)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IssuedIdCardsController.prototype, "revokeCard", null);
__decorate([
    (0, common_1.Get)('verify/:cardNumber'),
    (0, swagger_1.ApiOperation)({
        summary: 'PUBLIC: Verify an ID Card by its unique number (via QR/Barcode scanner)'
    }),
    __param(0, (0, common_1.Param)('cardNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IssuedIdCardsController.prototype, "verifyCard", null);
exports.IssuedIdCardsController = IssuedIdCardsController = __decorate([
    (0, swagger_1.ApiTags)('Academics / Issued ID Cards'),
    (0, common_1.Controller)('issued-id-cards'),
    __metadata("design:paramtypes", [issued_id_cards_service_1.IssuedIdCardsService])
], IssuedIdCardsController);
//# sourceMappingURL=issued-id-cards.controller.js.map