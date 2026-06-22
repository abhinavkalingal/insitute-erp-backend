"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialsModule = void 0;
const common_1 = require("@nestjs/common");
const categories_controller_1 = require("./controllers/categories/categories.controller");
const materials_controller_1 = require("./controllers/materials/materials.controller");
const categories_service_1 = require("./services/categories/categories.service");
const materials_service_1 = require("./services/materials/materials.service");
let MaterialsModule = class MaterialsModule {
};
exports.MaterialsModule = MaterialsModule;
exports.MaterialsModule = MaterialsModule = __decorate([
    (0, common_1.Module)({
        providers: [categories_service_1.CategoriesService, materials_service_1.MaterialsService],
        controllers: [categories_controller_1.CategoriesController, materials_controller_1.MaterialsController]
    })
], MaterialsModule);
//# sourceMappingURL=materials.module.js.map