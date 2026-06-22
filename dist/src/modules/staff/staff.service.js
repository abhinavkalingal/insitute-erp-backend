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
exports.StaffService = void 0;
const page_dto_1 = require("../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
let StaffService = class StaffService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createStaffDto) {
        const { email, password, firstName, lastName, branchId, employeeId, department, designation, joiningDate, profile } = createStaffDto;
        const existingUser = await this.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new common_1.ConflictException('Email already in use');
        }
        if (employeeId) {
            const existingStaff = await this.prisma.staff.findFirst({
                where: { employeeId }
            });
            if (existingStaff) {
                throw new common_1.ConflictException(`Employee ID ${employeeId} already exists in this institute`);
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
                    isEmailVerified: true,
                }
            });
            const parsedJoiningDate = joiningDate ? new Date(joiningDate) : null;
            const staff = await tx.staff.create({
                data: {
                    userId: user.id,
                    branchId,
                    employeeId,
                    department,
                    designation,
                    joiningDate: parsedJoiningDate,
                    profile: profile
                },
                include: {
                    user: true,
                }
            });
            return staff;
        });
    }
    async findAll(queryOptions) {
        const where = {
            deletedAt: null
        };
        if (queryOptions.department) {
            where.department = queryOptions.department;
        }
        if (queryOptions.branchId) {
            where.branchId = queryOptions.branchId;
        }
        if (queryOptions.status) {
            where.status = queryOptions.status;
        }
        if (queryOptions.search) {
            where.OR = [
                { employeeId: { contains: queryOptions.search, mode: 'insensitive' } },
                { user: { firstName: { contains: queryOptions.search, mode: 'insensitive' } } },
                { user: { lastName: { contains: queryOptions.search, mode: 'insensitive' } } },
                { user: { email: { contains: queryOptions.search, mode: 'insensitive' } } },
            ];
        }
        const itemCount = await this.prisma.staff.count({ where });
        const staffList = await this.prisma.staff.findMany({
            where,
            include: {
                user: {
                    select: { id: true, firstName: true, lastName: true, email: true, isActive: true }
                },
                branch: {
                    select: { id: true, name: true }
                }
            },
            orderBy: { createdAt: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(staffList, pageMetaDto);
    }
    async findOne(id) {
        const staff = await this.prisma.staff.findFirst({
            where: { id },
            include: {
                user: {
                    select: { id: true, firstName: true, lastName: true, email: true, isActive: true }
                },
                branch: {
                    select: { id: true, name: true }
                }
            }
        });
        if (!staff || staff.deletedAt) {
            throw new common_1.NotFoundException(`Staff member not found`);
        }
        return staff;
    }
    async update(id, updateStaffDto) {
        const staff = await this.findOne(id);
        const { email, firstName, lastName, branchId, employeeId, department, designation, joiningDate, profile } = updateStaffDto;
        if (employeeId && employeeId !== staff.employeeId) {
            const existing = await this.prisma.staff.findFirst({ where: { employeeId } });
            if (existing) {
                throw new common_1.ConflictException(`Employee ID ${employeeId} already in use`);
            }
        }
        return this.prisma.$transaction(async (tx) => {
            if (email || firstName || lastName) {
                if (email && email !== staff.user.email) {
                    const userWithEmail = await tx.user.findUnique({ where: { email } });
                    if (userWithEmail)
                        throw new common_1.ConflictException('Email already in use');
                }
                await tx.user.update({
                    where: { id: staff.userId },
                    data: { email, firstName, lastName }
                });
            }
            const updatedProfile = profile
                ? { ...staff.profile, ...profile }
                : undefined;
            const parsedJoiningDate = joiningDate !== undefined ? (joiningDate ? new Date(joiningDate) : null) : undefined;
            const updatedStaff = await tx.staff.update({
                where: { id },
                data: {
                    branchId,
                    employeeId,
                    department,
                    designation,
                    ...(parsedJoiningDate !== undefined && { joiningDate: parsedJoiningDate }),
                    ...(profile && { profile: updatedProfile })
                },
                include: {
                    user: { select: { firstName: true, lastName: true, email: true } }
                }
            });
            return updatedStaff;
        });
    }
    async uploadDocument(id, documentUrl, originalName, mimetype) {
        const staff = await this.findOne(id);
        const existingDocs = staff.documents || [];
        const newDoc = {
            url: documentUrl,
            name: originalName,
            type: mimetype,
            uploadedAt: new Date().toISOString()
        };
        return this.prisma.staff.update({
            where: { id },
            data: {
                documents: [...existingDocs, newDoc]
            }
        });
    }
    async remove(id) {
        const staff = await this.findOne(id);
        return this.prisma.$transaction(async (tx) => {
            await tx.staff.update({
                where: { id },
                data: { deletedAt: new Date(), status: 'TERMINATED' }
            });
            await tx.user.update({
                where: { id: staff.userId },
                data: { deletedAt: new Date(), isActive: false }
            });
            return { message: 'Staff and associated User soft-deleted successfully' };
        });
    }
};
exports.StaffService = StaffService;
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StaffService);
//# sourceMappingURL=staff.service.js.map