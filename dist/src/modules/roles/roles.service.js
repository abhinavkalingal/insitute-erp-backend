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
exports.RolesService = void 0;
const prisma_service_1 = require("../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
let RolesService = class RolesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRoleDto) {
        const existing = await this.prisma.role.findFirst({
            where: {
                name: createRoleDto.name
            }
        });
        if (existing) {
            throw new common_1.ConflictException('Role already exists for this institute');
        }
        const { permissionIds, ...roleData } = createRoleDto;
        return this.prisma.role.create({
            data: {
                ...roleData,
                permissions: permissionIds
                    ? {
                        create: permissionIds.map((permissionId) => ({
                            permission: { connect: { id: permissionId } }
                        }))
                    }
                    : undefined
            },
            include: {
                permissions: {
                    include: { permission: true }
                }
            }
        });
    }
    findAll() {
        return this.prisma.role.findMany({
            include: {
                permissions: {
                    include: { permission: true }
                }
            }
        });
    }
    async update(id, updateRoleDto) {
        const existing = await this.prisma.role.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('Role not found');
        const { permissionIds, ...roleData } = updateRoleDto;
        if (permissionIds) {
            await this.prisma.rolePermission.deleteMany({ where: { roleId: id } });
        }
        return this.prisma.role.update({
            where: { id },
            data: {
                ...roleData,
                permissions: permissionIds
                    ? {
                        create: permissionIds.map((permissionId) => ({
                            permission: { connect: { id: permissionId } }
                        }))
                    }
                    : undefined
            },
            include: {
                permissions: {
                    include: { permission: true }
                }
            }
        });
    }
    async remove(id) {
        const existing = await this.prisma.role.findUnique({ where: { id } });
        if (!existing) {
            throw new common_1.NotFoundException('Role not found');
        }
        await this.prisma.role.delete({ where: { id } });
        return { message: 'Role deleted successfully' };
    }
    async assignRoleToUser(userId, roleId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const role = await this.prisma.role.findUnique({ where: { id: roleId } });
        if (!role)
            throw new common_1.NotFoundException('Role not found');
        await this.prisma.userRole.create({
            data: {
                userId,
                roleId
            }
        });
        return { message: 'Role assigned successfully' };
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RolesService);
//# sourceMappingURL=roles.service.js.map