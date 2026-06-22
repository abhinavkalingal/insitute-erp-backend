import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
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
    assignRole(userId: string, roleId: string): Promise<{
        message: string;
    }>;
}
