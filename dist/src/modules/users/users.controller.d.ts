import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string | null;
        isActive: boolean;
        isEmailVerified: boolean;
        resetPasswordToken: string | null;
        resetPasswordExpires: Date | null;
        emailVerificationToken: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    getProfile(req: any): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string | null;
        isActive: boolean;
        createdAt: Date;
        deletedAt: Date | null;
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
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
            };
        } & {
            createdAt: Date;
            userId: string;
            roleId: string;
        })[];
    }>;
    findAll(): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string | null;
        isActive: boolean;
        createdAt: Date;
        roles: ({
            role: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
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
        email: string;
        firstName: string;
        lastName: string | null;
        isActive: boolean;
        createdAt: Date;
        deletedAt: Date | null;
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
                createdAt: Date;
                updatedAt: Date;
                name: string;
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
        email: string;
        firstName: string;
        lastName: string | null;
        isActive: boolean;
        isEmailVerified: boolean;
        resetPasswordToken: string | null;
        resetPasswordExpires: Date | null;
        emailVerificationToken: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    toggleStatus(id: string): Promise<{
        message: string;
    }>;
}
