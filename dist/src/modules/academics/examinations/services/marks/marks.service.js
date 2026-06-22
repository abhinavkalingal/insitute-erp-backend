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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarksService = void 0;
const page_dto_1 = require("../../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
let MarksService = class MarksService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async bulkUpsertMarks(bulkDto) {
        const exam = await this.prisma.exam.findFirst({
            where: { id: bulkDto.examId },
            include: { term: true }
        });
        if (!exam) {
            throw new common_1.NotFoundException('Exam not found');
        }
        if (exam.term.isPublished) {
            throw new common_1.ForbiddenException('Cannot modify marks because the Exam Term is already published.');
        }
        return this.prisma.$transaction(bulkDto.marks.map((mark) => {
            return this.prisma.examMark.upsert({
                where: {
                    examId_studentId: {
                        examId: bulkDto.examId,
                        studentId: mark.studentId
                    }
                },
                create: {
                    examId: bulkDto.examId,
                    studentId: mark.studentId,
                    marksObtained: mark.marksObtained,
                    remarks: mark.remarks,
                    isAbsent: mark.isAbsent ?? false
                },
                update: {
                    marksObtained: mark.marksObtained,
                    remarks: mark.remarks,
                    isAbsent: mark.isAbsent ?? false
                }
            });
        }));
    }
    async findAll(queryOptions) {
        const where = {
            exam: {}
        };
        if (queryOptions.examId)
            where.examId = queryOptions.examId;
        if (queryOptions.studentId)
            where.studentId = queryOptions.studentId;
        const itemCount = await this.prisma.examMark.count({ where });
        const marks = await this.prisma.examMark.findMany({
            where,
            include: {
                student: { include: { user: { select: { firstName: true, lastName: true } } } },
                exam: {
                    select: { maxMarks: true, passingMarks: true, subject: { select: { name: true } } }
                }
            },
            orderBy: { createdAt: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(marks, pageMetaDto);
    }
};
exports.MarksService = MarksService;
exports.MarksService = MarksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MarksService);
//# sourceMappingURL=marks.service.js.map