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
exports.EventCategoriesController = void 0;
const permissions_decorator_1 = require("../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../core/guards/permissions.guard");
const api_paginated_response_decorator_1 = require("../../../../core/utils/pagination/api-paginated-response.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const category_dto_1 = require("../../dto/category.dto");
const event_categories_service_1 = require("../../services/event-categories/event-categories.service");
let EventCategoriesController = class EventCategoriesController {
    eventCategoriesService;
    constructor(eventCategoriesService) {
        this.eventCategoriesService = eventCategoriesService;
    }
    create(createDto) {
        return this.eventCategoriesService.create(createDto);
    }
    findAll(queryOptions) {
        return this.eventCategoriesService.findAll(queryOptions);
    }
    findOne(id) {
        return this.eventCategoriesService.findOne(id);
    }
    update(id, updateDto) {
        return this.eventCategoriesService.update(id, updateDto);
    }
    remove(id) {
        return this.eventCategoriesService.remove(id);
    }
};
exports.EventCategoriesController = EventCategoriesController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('create:events'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new event category' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CreateEventCategoryDto]),
    __metadata("design:returntype", void 0)
], EventCategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('read:events'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all event categories' }),
    (0, api_paginated_response_decorator_1.ApiPaginatedResponse)(category_dto_1.CreateEventCategoryDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.EventCategoryQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], EventCategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('read:events'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific event category by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventCategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('update:events'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an event category' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, category_dto_1.UpdateEventCategoryDto]),
    __metadata("design:returntype", void 0)
], EventCategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('delete:events'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an event category' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventCategoriesController.prototype, "remove", null);
exports.EventCategoriesController = EventCategoriesController = __decorate([
    (0, swagger_1.ApiTags)('Events / Categories'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('event-categories'),
    __metadata("design:paramtypes", [event_categories_service_1.EventCategoriesService])
], EventCategoriesController);
//# sourceMappingURL=event-categories.controller.js.map