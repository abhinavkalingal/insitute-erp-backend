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
exports.SubmissionsService = void 0;
const page_dto_1 = require("../../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
let SubmissionsService = class SubmissionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async submit(createDto, studentId) {
        const assignment = await this.prisma.assignment.findUnique({
            where: { id: createDto.assignmentId }
        });
        if (!assignment) {
            throw new common_1.NotFoundException('Assignment not found');
        }
        const now = new Date();
        const isLate = now > assignment.dueDate;
        const status = isLate ? 'LATE' : 'SUBMITTED';
        return this.prisma.assignmentSubmission.upsert({
            where: {
                assignmentId_studentId: {
                    assignmentId: createDto.assignmentId,
                    studentId
                }
            },
            create: {
                assignmentId: createDto.assignmentId,
                studentId,
                content: createDto.content,
                fileUrl: createDto.fileUrl,
                status,
                submittedAt: now
            },
            update: {
                content: createDto.content,
                fileUrl: createDto.fileUrl,
                status,
                submittedAt: now
            }
        });
    }
    async grade(submissionId, staffId, gradeDto) {
        const submission = await this.prisma.assignmentSubmission.findUnique({
            where: { id: submissionId },
            include: { assignment: true }
        });
        if (!submission) {
            throw new common_1.NotFoundException('Submission not found');
        }
        if (submission.assignment.maxMarks && gradeDto.marksObtained > submission.assignment.maxMarks) {
            throw new common_1.BadRequestException(`Marks cannot exceed the maximum allowed (${submission.assignment.maxMarks})`);
        }
        return this.prisma.assignmentSubmission.update({
            where: { id: submissionId },
            data: {
                marksObtained: gradeDto.marksObtained,
                feedback: gradeDto.feedback,
                gradedById: staffId,
                gradedAt: new Date(),
                status: 'GRADED'
            },
            include: {
                student: { include: { user: { select: { firstName: true, lastName: true } } } },
                gradedBy: { include: { user: { select: { firstName: true, lastName: true } } } }
            }
        });
    }
    async findAll(queryOptions) {
        const where = {
            assignment: {}
        };
        if (queryOptions.assignmentId)
            where.assignmentId = queryOptions.assignmentId;
        if (queryOptions.studentId)
            where.studentId = queryOptions.studentId;
        if (queryOptions.status)
            where.status = queryOptions.status;
        const itemCount = await this.prisma.assignmentSubmission.count({ where });
        const submissions = await this.prisma.assignmentSubmission.findMany({
            where,
            include: {
                student: { include: { user: { select: { firstName: true, lastName: true } } } },
                assignment: { select: { title: true, maxMarks: true } },
                gradedBy: { include: { user: { select: { firstName: true, lastName: true } } } }
            },
            orderBy: { submittedAt: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(submissions, pageMetaDto);
    }
    async findOne(id) {
        const submission = await this.prisma.assignmentSubmission.findUnique({
            where: { id },
            include: {
                student: {
                    include: { user: { select: { firstName: true, lastName: true, email: true } } }
                },
                assignment: true,
                gradedBy: { include: { user: { select: { firstName: true, lastName: true } } } }
            }
        });
        if (!submission) {
            throw new common_1.NotFoundException(`Submission not found`);
        }
        return submission;
    }
};
exports.SubmissionsService = SubmissionsService;
exports.SubmissionsService = SubmissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubmissionsService);
//# sourceMappingURL=submissions.service.js.map