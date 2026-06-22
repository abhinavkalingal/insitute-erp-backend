"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsService = void 0;
const page_dto_1 = require("../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
let StudentsService = class StudentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createStudentDto) {
        const { email, password, firstName, lastName, branchId, enrollmentNo, batchId, courseId, admissionDate, profile } = createStudentDto;
        const existingUser = await this.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new common_1.ConflictException('Email already in use');
        }
        if (enrollmentNo) {
            const existingStudent = await this.prisma.student.findFirst({
                where: { enrollmentNo }
            });
            if (existingStudent) {
                throw new common_1.ConflictException(`Enrollment number ${enrollmentNo} already exists`);
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email,
                    passwordHash: hashedPassword,
                    firstName,
                    lastName,
                    isEmailVerified: true
                }
            });
            const parsedAdmissionDate = admissionDate ? new Date(admissionDate) : null;
            const student = await tx.student.create({
                data: {
                    userId: user.id,
                    branchId,
                    enrollmentNo,
                    batchId,
                    courseId,
                    admissionDate: parsedAdmissionDate,
                    profile: profile
                },
                include: {
                    user: true
                }
            });
            return student;
        });
    }
    async findAll(queryOptions) {
        const where = {
            deletedAt: null
        };
        if (queryOptions.courseId)
            where.courseId = queryOptions.courseId;
        if (queryOptions.batchId)
            where.batchId = queryOptions.batchId;
        if (queryOptions.branchId)
            where.branchId = queryOptions.branchId;
        if (queryOptions.status)
            where.status = queryOptions.status;
        if (queryOptions.search) {
            where.OR = [
                { enrollmentNo: { contains: queryOptions.search, mode: 'insensitive' } },
                { user: { firstName: { contains: queryOptions.search, mode: 'insensitive' } } },
                { user: { lastName: { contains: queryOptions.search, mode: 'insensitive' } } },
                { user: { email: { contains: queryOptions.search, mode: 'insensitive' } } },
            ];
        }
        const itemCount = await this.prisma.student.count({ where });
        const students = await this.prisma.student.findMany({
            where,
            include: {
                user: {
                    select: { id: true, firstName: true, lastName: true, email: true, isActive: true }
                },
                branch: { select: { id: true, name: true } },
                guardians: {
                    include: {
                        guardian: {
                            include: { user: { select: { firstName: true, lastName: true, email: true } } }
                        }
                    }
                }
            },
            orderBy: { createdAt: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(students, pageMetaDto);
    }
    async findOne(id) {
        const student = await this.prisma.student.findFirst({
            where: { id },
            include: {
                user: {
                    select: { id: true, firstName: true, lastName: true, email: true, isActive: true }
                },
                branch: { select: { id: true, name: true } },
                guardians: {
                    include: {
                        guardian: {
                            include: { user: { select: { firstName: true, lastName: true, email: true } } }
                        }
                    }
                }
            }
        });
        if (!student || student.deletedAt) {
            throw new common_1.NotFoundException(`Student not found`);
        }
        return student;
    }
    async update(id, updateStudentDto) {
        const student = await this.findOne(id);
        const { email, firstName, lastName, branchId, enrollmentNo, batchId, courseId, admissionDate, profile } = updateStudentDto;
        if (enrollmentNo && enrollmentNo !== student.enrollmentNo) {
            const existing = await this.prisma.student.findFirst({
                where: { enrollmentNo }
            });
            if (existing)
                throw new common_1.ConflictException(`Enrollment No ${enrollmentNo} already in use`);
        }
        return this.prisma.$transaction(async (tx) => {
            if (email || firstName || lastName) {
                if (email && email !== student.user.email) {
                    const userWithEmail = await tx.user.findUnique({ where: { email } });
                    if (userWithEmail)
                        throw new common_1.ConflictException('Email already in use');
                }
                await tx.user.update({
                    where: { id: student.userId },
                    data: { email, firstName, lastName }
                });
            }
            const updatedProfile = profile
                ? { ...student.profile, ...profile }
                : undefined;
            const parsedAdmissionDate = admissionDate !== undefined ? (admissionDate ? new Date(admissionDate) : null) : undefined;
            const updatedStudent = await tx.student.update({
                where: { id },
                data: {
                    branchId,
                    enrollmentNo,
                    batchId,
                    courseId,
                    ...(parsedAdmissionDate !== undefined && { admissionDate: parsedAdmissionDate }),
                    ...(profile && { profile: updatedProfile })
                },
                include: {
                    user: { select: { firstName: true, lastName: true, email: true } }
                }
            });
            return updatedStudent;
        });
    }
    async linkGuardian(id, linkDto) {
        const student = await this.findOne(id);
        return this.prisma.$transaction(async (tx) => {
            let finalGuardianId = linkDto.guardianId;
            if (!finalGuardianId) {
                if (!linkDto.email || !linkDto.password || !linkDto.firstName) {
                    throw new common_1.BadRequestException('Email, password, and firstName are required to create a new guardian');
                }
                const existingUser = await tx.user.findUnique({ where: { email: linkDto.email } });
                if (existingUser) {
                    throw new common_1.ConflictException('Email already in use for a new guardian');
                }
                const hashedPassword = await bcrypt.hash(linkDto.password, 10);
                const newUser = await tx.user.create({
                    data: {
                        email: linkDto.email,
                        passwordHash: hashedPassword,
                        firstName: linkDto.firstName,
                        lastName: linkDto.lastName,
                        isEmailVerified: true
                    }
                });
                const newGuardian = await tx.guardian.create({
                    data: {
                        userId: newUser.id,
                        profile: linkDto.profile
                    }
                });
                finalGuardianId = newGuardian.id;
            }
            else {
                const existingGuardian = await tx.guardian.findFirst({
                    where: { id: finalGuardianId }
                });
                if (!existingGuardian) {
                    throw new common_1.NotFoundException(`Guardian with ID ${finalGuardianId} not found`);
                }
            }
            const link = await tx.studentGuardian.upsert({
                where: {
                    studentId_guardianId: {
                        studentId: student.id,
                        guardianId: finalGuardianId
                    }
                },
                update: {
                    relationship: linkDto.relationship,
                    isPrimary: linkDto.isPrimary ?? false
                },
                create: {
                    studentId: student.id,
                    guardianId: finalGuardianId,
                    relationship: linkDto.relationship,
                    isPrimary: linkDto.isPrimary ?? false
                }
            });
            return { message: 'Guardian linked successfully', link };
        });
    }
    async uploadDocument(id, documentUrl, originalName, mimetype) {
        const student = await this.findOne(id);
        const existingDocs = student.documents || [];
        const newDoc = {
            url: documentUrl,
            name: originalName,
            type: mimetype,
            uploadedAt: new Date().toISOString()
        };
        return this.prisma.student.update({
            where: { id },
            data: {
                documents: [...existingDocs, newDoc]
            }
        });
    }
    async remove(id) {
        const student = await this.findOne(id);
        return this.prisma.$transaction(async (tx) => {
            await tx.student.update({
                where: { id },
                data: { deletedAt: new Date(), status: 'TERMINATED' },
            });
            await tx.user.update({
                where: { id: student.userId },
                data: { deletedAt: new Date(), isActive: false }
            });
            return { message: 'Student and associated User soft-deleted successfully' };
        });
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudentsService);
//# sourceMappingURL=students.service.js.map