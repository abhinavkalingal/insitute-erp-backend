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
exports.ToolsController = void 0;
const common_1 = require("@nestjs/common");
const tools_service_1 = require("./tools.service");
const client_1 = require("@prisma/client");
let ToolsController = class ToolsController {
    toolsService;
    constructor(toolsService) {
        this.toolsService = toolsService;
    }
    createTool(data) {
        return this.toolsService.createTool(data);
    }
    getTools() {
        return this.toolsService.getTools();
    }
    issueTool(barcode, assignedToUser) {
        return this.toolsService.issueTool(barcode, assignedToUser);
    }
    returnTool(barcode) {
        return this.toolsService.returnTool(barcode);
    }
};
exports.ToolsController = ToolsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ToolsController.prototype, "createTool", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ToolsController.prototype, "getTools", null);
__decorate([
    (0, common_1.Post)('issue'),
    __param(0, (0, common_1.Body)('barcode')),
    __param(1, (0, common_1.Body)('assignedToUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ToolsController.prototype, "issueTool", null);
__decorate([
    (0, common_1.Post)('return'),
    __param(0, (0, common_1.Body)('barcode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ToolsController.prototype, "returnTool", null);
exports.ToolsController = ToolsController = __decorate([
    (0, common_1.Controller)('workshop/tools'),
    __metadata("design:paramtypes", [tools_service_1.ToolsService])
], ToolsController);
//# sourceMappingURL=tools.controller.js.map