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
exports.BranchesService = void 0;
const saas_enforcement_service_1 = require("../../core/services/saas-enforcement.service");
const page_dto_1 = require("../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
let BranchesService = class BranchesService {
    prisma;
    saasEnforcement;
    constructor(prisma, saasEnforcement) {
        this.prisma = prisma;
        this.saasEnforcement = saasEnforcement;
    }
    async create(instituteId, createBranchDto) {
        const currentBranchesCount = await this.prisma.branch.count({
            where: { deletedAt: null }
        });
        await this.saasEnforcement.checkLimit(instituteId, 'MAX_BRANCHES', currentBranchesCount);
        const { address, settings, ...rest } = createBranchDto;
        return this.prisma.branch.create({
            data: {
                ...rest,
                address: address,
                settings: settings
            }
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
            where.OR = [{ name: { contains: queryOptions.search, mode: 'insensitive' } }];
        }
        const itemCount = await this.prisma.branch.count({ where });
        const branches = await this.prisma.branch.findMany({
            where,
            orderBy: { createdAt: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(branches, pageMetaDto);
    }
    async findOne(id) {
        const branch = await this.prisma.branch.findFirst({
            where: { id }
        });
        if (!branch || branch.deletedAt) {
            throw new common_1.NotFoundException(`Branch with ID ${id} not found in your institute`);
        }
        return branch;
    }
    async update(id, updateBranchDto) {
        await this.findOne(id);
        const { address, settings, ...rest } = updateBranchDto;
        const currentBranch = await this.prisma.branch.findUnique({ where: { id } });
        const updatedAddress = address
            ? { ...currentBranch?.address, ...address }
            : undefined;
        const updatedSettings = settings
            ? { ...currentBranch?.settings, ...settings }
            : undefined;
        return this.prisma.branch.update({
            where: { id },
            data: {
                ...rest,
                ...(address && { address: updatedAddress }),
                ...(settings && { settings: updatedSettings })
            }
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.branch.update({
            where: { id },
            data: { deletedAt: new Date(), isActive: false }
        });
        return { message: 'Branch soft-deleted successfully' };
    }
};
exports.BranchesService = BranchesService;
exports.BranchesService = BranchesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        saas_enforcement_service_1.SaasEnforcementService])
], BranchesService);
//# sourceMappingURL=branches.service.js.map