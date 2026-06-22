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
exports.TimetablesService = void 0;
const page_dto_1 = require("../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
let TimetablesService = class TimetablesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        const { periods, ...timetableData } = createDto;
        return this.prisma.$transaction(async (tx) => {
            const timetable = await tx.timetable.create({
                data: {
                    ...timetableData
                }
            });
            if (periods && periods.length > 0) {
                await tx.timetablePeriod.createMany({
                    data: periods.map((p) => ({
                        timetableId: timetable.id,
                        dayOfWeek: p.dayOfWeek,
                        startTime: p.startTime,
                        endTime: p.endTime,
                        subjectId: p.subjectId,
                        teacherId: p.teacherId,
                        roomId: p.roomId
                    }))
                });
            }
            return this.findOne(timetable.id, tx);
        });
    }
    async findAll(queryOptions) {
        const where = {};
        if (queryOptions.batchId) {
            where.batchId = queryOptions.batchId;
        }
        if (queryOptions.isActive !== undefined) {
            where.isActive = queryOptions.isActive === 'true';
        }
        const itemCount = await this.prisma.timetable.count({ where });
        const timetables = await this.prisma.timetable.findMany({
            where,
            include: {
                batch: { select: { name: true, course: { select: { name: true } } } },
                _count: { select: { periods: true } }
            },
            orderBy: { createdAt: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(timetables, pageMetaDto);
    }
    async findOne(id, tx = this.prisma) {
        const timetable = await tx.timetable.findFirst({
            where: { id },
            include: {
                batch: { select: { name: true, course: { select: { name: true } } } },
                periods: {
                    include: {
                        subject: { select: { name: true, code: true } },
                        teacher: { include: { user: { select: { firstName: true, lastName: true } } } },
                        room: { select: { name: true } }
                    },
                    orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }]
                }
            }
        });
        if (!timetable) {
            throw new common_1.NotFoundException(`Timetable not found`);
        }
        return timetable;
    }
    async update(id, updateDto) {
        await this.findOne(id);
        const { periods, ...timetableData } = updateDto;
        return this.prisma.$transaction(async (tx) => {
            if (Object.keys(timetableData).length > 0) {
                await tx.timetable.update({
                    where: { id },
                    data: timetableData
                });
            }
            if (periods) {
                await tx.timetablePeriod.deleteMany({
                    where: { timetableId: id }
                });
                if (periods.length > 0) {
                    await tx.timetablePeriod.createMany({
                        data: periods.map((p) => ({
                            timetableId: id,
                            dayOfWeek: p.dayOfWeek,
                            startTime: p.startTime,
                            endTime: p.endTime,
                            subjectId: p.subjectId,
                            teacherId: p.teacherId,
                            roomId: p.roomId
                        }))
                    });
                }
            }
            return this.findOne(id, tx);
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.timetable.delete({
            where: { id }
        });
        return { message: 'Timetable deleted successfully' };
    }
    async findTeacherSchedule(staffId) {
        const periods = await this.prisma.timetablePeriod.findMany({
            where: {
                teacherId: staffId,
                timetable: {
                    isActive: true
                }
            },
            include: {
                timetable: {
                    select: {
                        name: true,
                        batch: { select: { name: true, course: { select: { name: true } } } }
                    }
                },
                subject: { select: { name: true, code: true } },
                room: { select: { name: true } }
            },
            orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }]
        });
        return periods;
    }
};
exports.TimetablesService = TimetablesService;
exports.TimetablesService = TimetablesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TimetablesService);
//# sourceMappingURL=timetables.service.js.map