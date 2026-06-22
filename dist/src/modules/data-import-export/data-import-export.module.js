"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataImportExportModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../../infrastructure/database/database.module");
const data_import_export_controller_1 = require("./data-import-export.controller");
const data_import_export_service_1 = require("./data-import-export.service");
let DataImportExportModule = class DataImportExportModule {
};
exports.DataImportExportModule = DataImportExportModule;
exports.DataImportExportModule = DataImportExportModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [data_import_export_controller_1.DataImportExportController],
        providers: [data_import_export_service_1.DataImportExportService],
        exports: [data_import_export_service_1.DataImportExportService]
    })
], DataImportExportModule);
//# sourceMappingURL=data-import-export.module.js.map