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
exports.ResultsController = void 0;
const permissions_decorator_1 = require("../../../../../core/decorators/permissions.decorator");
const permissions_guard_1 = require("../../../../../core/guards/permissions.guard");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const result_query_options_dto_1 = require("../../dto/result-query-options.dto");
const results_service_1 = require("../../services/results/results.service");
let ResultsController = class ResultsController {
    resultsService;
    constructor(resultsService) {
        this.resultsService = resultsService;
    }
    generateResults(examTermId) {
        return this.resultsService.generateResultsForTerm(examTermId);
    }
    getRankings(examTermId, queryOptions) {
        return this.resultsService.getRankings(examTermId, queryOptions);
    }
    getMarkSheet(examTermId, studentId) {
        return this.resultsService.getMarkSheet(examTermId, studentId);
    }
};
exports.ResultsController = ResultsController;
__decorate([
    (0, common_1.Post)('generate/:examTermId'),
    (0, permissions_decorator_1.RequirePermissions)('update:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Calculate and generate results for an Exam Term' }),
    __param(0, (0, common_1.Param)('examTermId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResultsController.prototype, "generateResults", null);
__decorate([
    (0, common_1.Get)('terms/:examTermId/rankings'),
    (0, permissions_decorator_1.RequirePermissions)('read:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get the leaderboard/ranking for a specific Exam Term' }),
    __param(0, (0, common_1.Param)('examTermId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, result_query_options_dto_1.ResultQueryOptionsDto]),
    __metadata("design:returntype", void 0)
], ResultsController.prototype, "getRankings", null);
__decorate([
    (0, common_1.Get)('mark-sheet/:examTermId/:studentId'),
    (0, permissions_decorator_1.RequirePermissions)('read:academics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a formal mark sheet for a student' }),
    __param(0, (0, common_1.Param)('examTermId')),
    __param(1, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ResultsController.prototype, "getMarkSheet", null);
exports.ResultsController = ResultsController = __decorate([
    (0, swagger_1.ApiTags)('Academics / Results'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('results'),
    __metadata("design:paramtypes", [results_service_1.ResultsService])
], ResultsController);
//# sourceMappingURL=results.controller.js.map