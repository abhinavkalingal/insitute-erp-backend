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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpreadsheetsController = void 0;
const common_1 = require("@nestjs/common");
const spreadsheets_service_1 = require("./spreadsheets.service");
const client_1 = require("@prisma/client");
let SpreadsheetsController = class SpreadsheetsController {
    spreadsheetsService;
    constructor(spreadsheetsService) {
        this.spreadsheetsService = spreadsheetsService;
    }
    createSpreadsheet(data) {
        return this.spreadsheetsService.createSpreadsheet(data);
    }
    getSpreadsheets() {
        return this.spreadsheetsService.getSpreadsheets();
    }
    getSpreadsheetById(id) {
        return this.spreadsheetsService.getSpreadsheetById(id);
    }
    updateSpreadsheet(id, data) {
        return this.spreadsheetsService.updateSpreadsheet(id, data);
    }
    deleteSpreadsheet(id) {
        return this.spreadsheetsService.deleteSpreadsheet(id);
    }
};
exports.SpreadsheetsController = SpreadsheetsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof client_1.Prisma !== "undefined" && client_1.Prisma.SpreadsheetDocumentCreateInput) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], SpreadsheetsController.prototype, "createSpreadsheet", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SpreadsheetsController.prototype, "getSpreadsheets", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpreadsheetsController.prototype, "getSpreadsheetById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof client_1.Prisma !== "undefined" && client_1.Prisma.SpreadsheetDocumentUpdateInput) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], SpreadsheetsController.prototype, "updateSpreadsheet", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpreadsheetsController.prototype, "deleteSpreadsheet", null);
exports.SpreadsheetsController = SpreadsheetsController = __decorate([
    (0, common_1.Controller)('analytics/spreadsheets'),
    __metadata("design:paramtypes", [spreadsheets_service_1.SpreadsheetsService])
], SpreadsheetsController);
//# sourceMappingURL=spreadsheets.controller.js.map