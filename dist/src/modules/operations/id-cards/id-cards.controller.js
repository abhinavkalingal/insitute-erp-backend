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
exports.IdCardsController = void 0;
const common_1 = require("@nestjs/common");
const id_cards_service_1 = require("./id-cards.service");
const client_1 = require("@prisma/client");
let IdCardsController = class IdCardsController {
    idCardsService;
    constructor(idCardsService) {
        this.idCardsService = idCardsService;
    }
    createTemplate(data) {
        return this.idCardsService.createTemplate(data);
    }
    getTemplates() {
        return this.idCardsService.getTemplates();
    }
    getTemplateById(id) {
        return this.idCardsService.getTemplateById(id);
    }
    updateTemplate(id, data) {
        return this.idCardsService.updateTemplate(id, data);
    }
    deleteTemplate(id) {
        return this.idCardsService.deleteTemplate(id);
    }
};
exports.IdCardsController = IdCardsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], IdCardsController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IdCardsController.prototype, "getTemplates", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IdCardsController.prototype, "getTemplateById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], IdCardsController.prototype, "updateTemplate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IdCardsController.prototype, "deleteTemplate", null);
exports.IdCardsController = IdCardsController = __decorate([
    (0, common_1.Controller)('operations/id-cards'),
    __metadata("design:paramtypes", [id_cards_service_1.IdCardsService])
], IdCardsController);
//# sourceMappingURL=id-cards.controller.js.map