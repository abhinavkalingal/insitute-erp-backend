"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExaminationsModule = void 0;
const common_1 = require("@nestjs/common");
const exams_controller_1 = require("./controllers/exams/exams.controller");
const grades_controller_1 = require("./controllers/grades/grades.controller");
const marks_controller_1 = require("./controllers/marks/marks.controller");
const exams_service_1 = require("./services/exams/exams.service");
const grades_service_1 = require("./services/grades/grades.service");
const marks_service_1 = require("./services/marks/marks.service");
let ExaminationsModule = class ExaminationsModule {
};
exports.ExaminationsModule = ExaminationsModule;
exports.ExaminationsModule = ExaminationsModule = __decorate([
    (0, common_1.Module)({
        providers: [exams_service_1.ExamsService, marks_service_1.MarksService, grades_service_1.GradesService],
        controllers: [exams_controller_1.ExamsController, marks_controller_1.MarksController, grades_controller_1.GradesController]
    })
], ExaminationsModule);
//# sourceMappingURL=examinations.module.js.map