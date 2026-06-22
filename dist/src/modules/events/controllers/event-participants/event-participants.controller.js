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
exports.EventParticipantsController = void 0;
const permissions_decorator_1 = require("../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../core/guards/permissions.guard");
const api_paginated_response_decorator_1 = require("../../../../core/utils/pagination/api-paginated-response.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const register_participant_dto_1 = require("../../dto/register-participant.dto");
const event_participants_service_1 = require("../../services/event-participants/event-participants.service");
let EventParticipantsController = class EventParticipantsController {
    eventParticipantsService;
    constructor(eventParticipantsService) {
        this.eventParticipantsService = eventParticipantsService;
    }
    register(registerDto) {
        return this.eventParticipantsService.register(registerDto);
    }
    findAll(queryOptions) {
        return this.eventParticipantsService.findAll(queryOptions);
    }
    cancelRegistration(id) {
        return this.eventParticipantsService.cancelRegistration(id);
    }
};
exports.EventParticipantsController = EventParticipantsController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('create:events'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a participant for an event' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_participant_dto_1.RegisterParticipantDto]),
    __metadata("design:returntype", void 0)
], EventParticipantsController.prototype, "register", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('read:events'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all event participants' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(register_participant_dto_1.RegisterParticipantDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_participant_dto_1.ParticipantQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], EventParticipantsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('update:events'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel a registration' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventParticipantsController.prototype, "cancelRegistration", null);
exports.EventParticipantsController = EventParticipantsController = __decorate([
    (0, swagger_1.ApiTags)('Events / Participants'),
    (0, common_1.Controller)('event-participants'),
    __metadata("design:paramtypes", [event_participants_service_1.EventParticipantsService])
], EventParticipantsController);
//# sourceMappingURL=event-participants.controller.js.map