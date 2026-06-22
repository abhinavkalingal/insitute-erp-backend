"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicsModule = void 0;
const common_1 = require("@nestjs/common");
const assignments_module_1 = require("./assignments/assignments.module");
const certificates_module_1 = require("./certificates/certificates.module");
const academic_years_controller_1 = require("./controllers/academic-years/academic-years.controller");
const batches_controller_1 = require("./controllers/batches/batches.controller");
const courses_controller_1 = require("./controllers/courses/courses.controller");
const subjects_controller_1 = require("./controllers/subjects/subjects.controller");
const examinations_module_1 = require("./examinations/examinations.module");
const id_cards_module_1 = require("./id-cards/id-cards.module");
const materials_module_1 = require("./materials/materials.module");
const results_module_1 = require("./results/results.module");
const academic_years_service_1 = require("./services/academic-years/academic-years.service");
const batches_service_1 = require("./services/batches/batches.service");
const courses_service_1 = require("./services/courses/courses.service");
const subjects_service_1 = require("./services/subjects/subjects.service");
let AcademicsModule = class AcademicsModule {
};
exports.AcademicsModule = AcademicsModule;
exports.AcademicsModule = AcademicsModule = __decorate([
    (0, common_1.Module)({
        providers: [courses_service_1.CoursesService, batches_service_1.BatchesService, subjects_service_1.SubjectsService, academic_years_service_1.AcademicYearsService],
        controllers: [courses_controller_1.CoursesController, batches_controller_1.BatchesController, subjects_controller_1.SubjectsController, academic_years_controller_1.AcademicYearsController],
        imports: [
            assignments_module_1.AssignmentsModule,
            materials_module_1.MaterialsModule,
            examinations_module_1.ExaminationsModule,
            results_module_1.ResultsModule,
            certificates_module_1.CertificatesModule,
            id_cards_module_1.IdCardsModule,
        ]
    })
], AcademicsModule);
//# sourceMappingURL=academics.module.js.map