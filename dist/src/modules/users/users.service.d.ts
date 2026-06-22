import { PrismaService } from "../../infrastructure/database/prisma.service";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string | null;
        isActive: boolean;
        isEmailVerified: boolean;
        deletedAt: Date | null;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        roles: ({
            role: {
                id: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
        } & {
            createdAt: Date;
            roleId: string;
            userId: string;
        })[];
        email: string;
        firstName: string;
        lastName: string | null;
        isActive: boolean;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        firstName: string;
        lastName: string | null;
        isActive: boolean;
        deletedAt: Date | null;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        firstName: string;
        lastName: string | null;
        isActive: boolean;
        isEmailVerified: boolean;
        deletedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    toggleStatus(id: string): Promise<{
        message: string;
    }>;
}
