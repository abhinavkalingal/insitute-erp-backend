"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimetablesModule = void 0;
const common_1 = require("@nestjs/common");
const rooms_controller_1 = require("./controllers/rooms/rooms.controller");
const timetables_controller_1 = require("./controllers/timetables/timetables.controller");
const rooms_service_1 = require("./services/rooms/rooms.service");
const timetables_service_1 = require("./services/timetables/timetables.service");
let TimetablesModule = class TimetablesModule {
};
exports.TimetablesModule = TimetablesModule;
exports.TimetablesModule = TimetablesModule = __decorate([
    (0, common_1.Module)({
        providers: [rooms_service_1.RoomsService, timetables_service_1.TimetablesService],
        controllers: [rooms_controller_1.RoomsController, timetables_controller_1.TimetablesController]
    })
], TimetablesModule);
//# sourceMappingURL=timetables.module.js.map