import { PrismaService } from "../../infrastructure/database/prisma.service";
import { CreatePermissionDto } from './dto/create-permission.dto';
export declare class PermissionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPermissionDto: CreatePermissionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        action: string;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        action: string;
    }[]>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
