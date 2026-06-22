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
exports.ResultsService = void 0;
const page_dto_1 = require("../../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
let ResultsService = class ResultsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateResultsForTerm(examTermId) {
        const term = await this.prisma.examTerm.findUnique({
            where: { id: examTermId }
        });
        if (!term) {
            throw new common_1.NotFoundException('Exam Term not found');
        }
        if (!term.isPublished) {
            throw new common_1.BadRequestException('Cannot generate results until the Exam Term is published.');
        }
        const gradeRules = await this.prisma.gradeRule.findMany({
            where: {},
            orderBy: { minPercent: 'desc' }
        });
        const exams = await this.prisma.exam.findMany({
            where: { examTermId },
            include: {
                marks: true
            }
        });
        if (exams.length === 0) {
            throw new common_1.BadRequestException('No exams found for this term.');
        }
        const studentAggregations = {};
        for (const exam of exams) {
            for (const mark of exam.marks) {
                if (!studentAggregations[mark.studentId]) {
                    studentAggregations[mark.studentId] = {
                        totalObtained: 0,
                        totalMax: 0,
                        pointsSum: 0,
                        examCount: 0
                    };
                }
                const studentAgg = studentAggregations[mark.studentId];
                const obtained = mark.isAbsent || mark.marksObtained === null ? 0 : mark.marksObtained;
                studentAgg.totalObtained += obtained;
                studentAgg.totalMax += exam.maxMarks;
                const percent = (obtained / exam.maxMarks) * 100;
                const matchedRule = gradeRules.find((r) => percent >= r.minPercent && percent <= r.maxPercent);
                if (matchedRule) {
                    studentAgg.pointsSum += matchedRule.gradePoint;
                }
                studentAgg.examCount += 1;
            }
        }
        const finalResults = [];
        for (const [studentId, agg] of Object.entries(studentAggregations)) {
            const percentage = agg.totalMax > 0 ? (agg.totalObtained / agg.totalMax) * 100 : 0;
            const gpa = agg.examCount > 0 ? agg.pointsSum / agg.examCount : 0;
            finalResults.push({
                studentId,
                totalMarksObtained: agg.totalObtained,
                totalMaxMarks: agg.totalMax,
                percentage: Number(percentage.toFixed(2)),
                gradePointAverage: Number(gpa.toFixed(2))
            });
        }
        finalResults.sort((a, b) => b.percentage - a.percentage);
        await this.prisma.$transaction(finalResults.map((res, index) => {
            return this.prisma.studentResult.upsert({
                where: {
                    examTermId_studentId: {
                        examTermId,
                        studentId: res.studentId
                    }
                },
                create: {
                    examTermId,
                    studentId: res.studentId,
                    totalMarksObtained: res.totalMarksObtained,
                    totalMaxMarks: res.totalMaxMarks,
                    percentage: res.percentage,
                    gradePointAverage: res.gradePointAverage,
                    rank: index + 1,
                },
                update: {
                    totalMarksObtained: res.totalMarksObtained,
                    totalMaxMarks: res.totalMaxMarks,
                    percentage: res.percentage,
                    gradePointAverage: res.gradePointAverage,
                    rank: index + 1
                }
            });
        }));
        return {
            message: `Results generated for ${finalResults.length} students.`,
            totalProcessed: finalResults.length
        };
    }
    async getRankings(examTermId, queryOptions) {
        const where = {
            examTermId
        };
        const itemCount = await this.prisma.studentResult.count({ where });
        const rankings = await this.prisma.studentResult.findMany({
            where,
            include: {
                student: { include: { user: { select: { firstName: true, lastName: true } } } }
            },
            orderBy: { rank: 'asc' },
            skip: queryOptions.skip,
            take: queryOptions.take
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(rankings, pageMetaDto);
    }
    async getMarkSheet(examTermId, studentId) {
        const result = await this.prisma.studentResult.findUnique({
            where: {
                examTermId_studentId: { examTermId, studentId }
            },
            include: {
                student: {
                    include: { user: { select: { firstName: true, lastName: true, email: true } } }
                },
                term: true
            }
        });
        if (!result) {
            throw new common_1.NotFoundException('Result not generated yet for this student');
        }
        const marks = await this.prisma.examMark.findMany({
            where: {
                studentId,
                exam: { examTermId }
            },
            include: {
                exam: {
                    select: {
                        date: true,
                        maxMarks: true,
                        passingMarks: true,
                        subject: { select: { name: true, code: true } }
                    }
                }
            }
        });
        return {
            summary: result,
            details: marks
        };
    }
};
exports.ResultsService = ResultsService;
exports.ResultsService = ResultsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ResultsService);
//# sourceMappingURL=results.service.js.map