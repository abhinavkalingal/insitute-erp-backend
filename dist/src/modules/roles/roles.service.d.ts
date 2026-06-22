import { PrismaService } from "../../infrastructure/database/prisma.service";
import { CreateRoleDto } from './dto/create-role.dto';
export declare class RolesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createRoleDto: CreateRoleDto): Promise<{
        permissions: ({
            permission: {
                id: string;
                action: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            createdAt: Date;
            permissionId: string;
            roleId: string;
        })[];
    } & {
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        permissions: ({
            permission: {
                id: string;
                action: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            createdAt: Date;
            permissionId: string;
            roleId: string;
        })[];
    } & {
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    })[]>;
    remove(id: string): Promise<{
        message: string;
    }>;
    assignRoleToUser(userId: string, roleId: string): Promise<{
        message: string;
    }>;
}
