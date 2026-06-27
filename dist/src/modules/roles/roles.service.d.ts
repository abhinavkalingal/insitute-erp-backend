import { PrismaService } from "../../infrastructure/database/prisma.service";
import { CreateRoleDto } from './dto/create-role.dto';
export declare class RolesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createRoleDto: CreateRoleDto): Promise<{
        permissions: ({
            permission: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                action: string;
            };
        } & {
            createdAt: Date;
            roleId: string;
            permissionId: string;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        permissions: ({
            permission: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                action: string;
            };
        } & {
            createdAt: Date;
            roleId: string;
            permissionId: string;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    })[]>;
    update(id: string, updateRoleDto: {
        name?: string;
        permissionIds?: string[];
    }): Promise<{
        permissions: ({
            permission: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                action: string;
            };
        } & {
            createdAt: Date;
            roleId: string;
            permissionId: string;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    assignRoleToUser(userId: string, roleId: string): Promise<{
        message: string;
    }>;
}
