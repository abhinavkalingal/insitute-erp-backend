"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopModule = void 0;
const common_1 = require("@nestjs/common");
const repair_tickets_service_1 = require("./repair-tickets.service");
const repair_tickets_controller_1 = require("./repair-tickets.controller");
const inventory_service_1 = require("./inventory.service");
const inventory_controller_1 = require("./inventory.controller");
const tools_service_1 = require("./tools.service");
const tools_controller_1 = require("./tools.controller");
const prisma_service_1 = require("../../infrastructure/database/prisma.service");
let WorkshopModule = class WorkshopModule {
};
exports.WorkshopModule = WorkshopModule;
exports.WorkshopModule = WorkshopModule = __decorate([
    (0, common_1.Module)({
        controllers: [repair_tickets_controller_1.RepairTicketsController, inventory_controller_1.InventoryController, tools_controller_1.ToolsController],
        providers: [repair_tickets_service_1.RepairTicketsService, inventory_service_1.InventoryService, tools_service_1.ToolsService, prisma_service_1.PrismaService],
        exports: [repair_tickets_service_1.RepairTicketsService, inventory_service_1.InventoryService, tools_service_1.ToolsService],
    })
], WorkshopModule);
//# sourceMappingURL=workshop.module.js.map