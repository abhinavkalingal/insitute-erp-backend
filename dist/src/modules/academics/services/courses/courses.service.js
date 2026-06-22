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
exports.CoursesService = void 0;
const page_dto_1 = require("../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
let CoursesService = class CoursesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        const { subjects, ...courseData } = createDto;
        return this.prisma.$transaction(async (tx) => {
            const course = await tx.course.create({
                data: {
                    ...courseData
                }
            });
            if (subjects && subjects.length > 0) {
                await tx.courseSubject.createMany({
                    data: subjects.map((sub) => ({
                        courseId: course.id,
                        subjectId: sub.subjectId,
                        isOptional: sub.isOptional ?? false
                    }))
                });
            }
            return this.findOne(course.id, tx);
        });
    }
    async findAll(queryOptions) {
        const where = {
            deletedAt: null
        };
        if (queryOptions.isActive !== undefined) {
            where.isActive = queryOptions.isActive === 'true';
        }
        if (queryOptions.search) {
            where.OR = [
                { name: { contains: queryOptions.search, mode: 'insensitive' } },
                { code: { contains: queryOptions.search, mode: 'insensitive' } },
            ];
        }
        const itemCount = await this.prisma.course.count({ where });
        const courses = await this.prisma.course.findMany({
            where,
            include: {
                subjects: {
                    include: {
                        subject: { select: { id: true, name: true, code: true, credits: true } }
                    }
                }
            },
            orderBy: { createdAt: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(courses, pageMetaDto);
    }
    async findOne(id, tx = this.prisma) {
        const course = await tx.course.findFirst({
            where: { id, deletedAt: null },
            include: {
                subjects: {
                    include: {
                        subject: { select: { id: true, name: true, code: true, credits: true } }
                    }
                }
            }
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course not found`);
        }
        return course;
    }
    async update(id, updateDto) {
        await this.findOne(id);
        const { subjects, ...courseData } = updateDto;
        return this.prisma.$transaction(async (tx) => {
            if (Object.keys(courseData).length > 0) {
                await tx.course.update({
                    where: { id },
                    data: courseData
                });
            }
            if (subjects) {
                await tx.courseSubject.deleteMany({
                    where: { courseId: id }
                });
                if (subjects.length > 0) {
                    await tx.courseSubject.createMany({
                        data: subjects.map((sub) => ({
                            courseId: id,
                            subjectId: sub.subjectId,
                            isOptional: sub.isOptional ?? false
                        }))
                    });
                }
            }
            return this.findOne(id, tx);
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.course.update({
            where: { id },
            data: { deletedAt: new Date(), isActive: false }
        });
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesService);
//# sourceMappingURL=courses.service.js.map