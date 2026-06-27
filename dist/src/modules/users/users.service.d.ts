import { PrismaService } from "../../infrastructure/database/prisma.service";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        email: string;
        firstName: string;
        lastName: string | null;
        isEmailVerified: boolean;
        resetPasswordToken: string | null;
        resetPasswordExpires: Date | null;
        emailVerificationToken: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        email: string;
        firstName: string;
        lastName: string | null;
        roles: ({
            role: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
            };
        } & {
            createdAt: Date;
            userId: string;
            roleId: string;
        })[];
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        deletedAt: Date | null;
        email: string;
        firstName: string;
        lastName: string | null;
        roles: ({
            role: {
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
            };
        } & {
            createdAt: Date;
            userId: string;
            roleId: string;
        })[];
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        email: string;
        firstName: string;
        lastName: string | null;
        isEmailVerified: boolean;
        resetPasswordToken: string | null;
        resetPasswordExpires: Date | null;
        emailVerificationToken: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    toggleStatus(id: string): Promise<{
        message: string;
    }>;
}
