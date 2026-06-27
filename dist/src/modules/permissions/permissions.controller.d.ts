import { CreatePermissionDto } from './dto/create-permission.dto';
import { PermissionsService } from './permissions.service';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
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
