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
exports.ExamsService = void 0;
const page_dto_1 = require("../../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
let ExamsService = class ExamsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTerm(createDto) {
        return this.prisma.examTerm.create({
            data: {
                ...createDto,
                startDate: new Date(createDto.startDate),
                endDate: new Date(createDto.endDate)
            }
        });
    }
    async findAllTerms(queryOptions) {
        const where = {};
        if (queryOptions.search) {
            where.name = { contains: queryOptions.search, mode: 'insensitive' };
        }
        const itemCount = await this.prisma.examTerm.count({ where });
        const terms = await this.prisma.examTerm.findMany({
            where,
            orderBy: { createdAt: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take,
            include: {
                _count: { select: { exams: true } }
            }
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(terms, pageMetaDto);
    }
    async findOneTerm(id) {
        const term = await this.prisma.examTerm.findFirst({
            where: { id },
            include: { exams: true }
        });
        if (!term)
            throw new common_1.NotFoundException('Exam Term not found');
        return term;
    }
    async updateTerm(id, updateDto) {
        await this.findOneTerm(id);
        const data = { ...updateDto };
        if (updateDto.startDate)
            data.startDate = new Date(updateDto.startDate);
        if (updateDto.endDate)
            data.endDate = new Date(updateDto.endDate);
        return this.prisma.examTerm.update({
            where: { id },
            data
        });
    }
    async removeTerm(id) {
        await this.findOneTerm(id);
        return this.prisma.examTerm.delete({ where: { id } });
    }
    async createExam(createDto) {
        await this.findOneTerm(createDto.examTermId);
        return this.prisma.exam.create({
            data: {
                ...createDto,
                date: new Date(createDto.date)
            }
        });
    }
    async findAllExams(queryOptions) {
        const where = {};
        if (queryOptions.examTermId)
            where.examTermId = queryOptions.examTermId;
        if (queryOptions.subjectId)
            where.subjectId = queryOptions.subjectId;
        if (queryOptions.courseId)
            where.courseId = queryOptions.courseId;
        if (queryOptions.batchId)
            where.batchId = queryOptions.batchId;
        const itemCount = await this.prisma.exam.count({ where });
        const exams = await this.prisma.exam.findMany({
            where,
            orderBy: { date: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take,
            include: {
                term: { select: { name: true, isPublished: true } },
                subject: { select: { name: true, code: true } },
                course: { select: { name: true } },
                batch: { select: { name: true } }
            }
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(exams, pageMetaDto);
    }
    async findOneExam(id) {
        const exam = await this.prisma.exam.findFirst({
            where: { id },
            include: {
                term: true,
                subject: true,
                course: true,
                batch: true
            }
        });
        if (!exam)
            throw new common_1.NotFoundException('Exam not found');
        return exam;
    }
    async updateExam(id, updateDto) {
        await this.findOneExam(id);
        const data = { ...updateDto };
        if (updateDto.date)
            data.date = new Date(updateDto.date);
        return this.prisma.exam.update({
            where: { id },
            data
        });
    }
    async removeExam(id) {
        await this.findOneExam(id);
        return this.prisma.exam.delete({ where: { id } });
    }
};
exports.ExamsService = ExamsService;
exports.ExamsService = ExamsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExamsService);
//# sourceMappingURL=exams.service.js.map