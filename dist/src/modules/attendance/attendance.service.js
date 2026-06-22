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
exports.AttendanceService = void 0;
const page_dto_1 = require("../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
const mark_attendance_dto_1 = require("./dto/mark-attendance.dto");
let AttendanceService = class AttendanceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async markAttendance(takenById, dto) {
        if (dto.type === mark_attendance_dto_1.AttendanceType.STUDENT && !dto.batchId) {
            throw new common_1.BadRequestException('batchId is required for STUDENT attendance');
        }
        const parsedDate = new Date(dto.date);
        const dateOnly = new Date(Date.UTC(parsedDate.getUTCFullYear(), parsedDate.getUTCMonth(), parsedDate.getUTCDate()));
        return this.prisma.$transaction(async (tx) => {
            let attendanceSheet = await tx.attendance.findFirst({
                where: {
                    date: dateOnly,
                    type: dto.type,
                    ...(dto.batchId && { batchId: dto.batchId }),
                    ...(dto.branchId && { branchId: dto.branchId })
                }
            });
            if (!attendanceSheet) {
                attendanceSheet = await tx.attendance.create({
                    data: {
                        takenById,
                        date: dateOnly,
                        type: dto.type,
                        batchId: dto.batchId,
                        branchId: dto.branchId
                    }
                });
            }
            else {
                await tx.attendance.update({
                    where: { id: attendanceSheet.id },
                    data: { takenById }
                });
            }
            for (const record of dto.records) {
                if (dto.type === mark_attendance_dto_1.AttendanceType.STUDENT && !record.studentId) {
                    throw new common_1.BadRequestException('studentId is required in records for STUDENT attendance');
                }
                if (dto.type === mark_attendance_dto_1.AttendanceType.STAFF && !record.staffId) {
                    throw new common_1.BadRequestException('staffId is required in records for STAFF attendance');
                }
                const identifierCondition = dto.type === mark_attendance_dto_1.AttendanceType.STUDENT
                    ? {
                        attendanceId_studentId: {
                            attendanceId: attendanceSheet.id,
                            studentId: record.studentId
                        }
                    }
                    : {
                        attendanceId_staffId: {
                            attendanceId: attendanceSheet.id,
                            staffId: record.staffId
                        }
                    };
                await tx.attendanceRecord.upsert({
                    where: identifierCondition,
                    update: {
                        status: record.status,
                        remarks: record.remarks
                    },
                    create: {
                        attendanceId: attendanceSheet.id,
                        studentId: record.studentId,
                        staffId: record.staffId,
                        status: record.status,
                        remarks: record.remarks
                    }
                });
            }
            return this.findOne(attendanceSheet.id, tx);
        });
    }
    async findAll(queryOptions) {
        const where = {};
        if (queryOptions.date) {
            const parsedDate = new Date(queryOptions.date);
            where.date = new Date(Date.UTC(parsedDate.getUTCFullYear(), parsedDate.getUTCMonth(), parsedDate.getUTCDate()));
        }
        else if (queryOptions.startDate && queryOptions.endDate) {
            where.date = {
                gte: new Date(queryOptions.startDate),
                lte: new Date(queryOptions.endDate)
            };
        }
        if (queryOptions.type)
            where.type = queryOptions.type;
        if (queryOptions.batchId)
            where.batchId = queryOptions.batchId;
        if (queryOptions.branchId)
            where.branchId = queryOptions.branchId;
        const itemCount = await this.prisma.attendance.count({ where });
        const attendances = await this.prisma.attendance.findMany({
            where,
            include: {
                batch: { select: { name: true, course: { select: { name: true } } } },
                takenBy: { select: { firstName: true, lastName: true } },
                _count: { select: { records: true } }
            },
            orderBy: { date: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(attendances, pageMetaDto);
    }
    async findOne(id, tx = this.prisma) {
        const attendance = await tx.attendance.findFirst({
            where: { id },
            include: {
                records: {
                    include: {
                        student: {
                            include: { user: { select: { firstName: true, lastName: true, email: true } } }
                        },
                        staff: {
                            include: { user: { select: { firstName: true, lastName: true, email: true } } }
                        }
                    }
                },
                batch: { select: { name: true, course: { select: { name: true } } } },
                takenBy: { select: { firstName: true, lastName: true } }
            }
        });
        if (!attendance) {
            throw new common_1.NotFoundException(`Attendance sheet not found`);
        }
        return attendance;
    }
    async getStudentHistory(studentId, queryOptions) {
        const student = await this.prisma.student.findFirst({ where: { id: studentId } });
        if (!student)
            throw new common_1.NotFoundException('Student not found');
        const where = {
            studentId,
            attendance: {}
        };
        if (queryOptions.startDate && queryOptions.endDate) {
            where.attendance = {
                date: {
                    gte: new Date(queryOptions.startDate),
                    lte: new Date(queryOptions.endDate)
                }
            };
        }
        const records = await this.prisma.attendanceRecord.findMany({
            where,
            include: {
                attendance: { select: { date: true, type: true } }
            },
            orderBy: { attendance: { date: 'desc' } }
        });
        return records;
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map