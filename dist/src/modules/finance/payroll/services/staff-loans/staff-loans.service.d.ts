import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
import { CreateStaffLoanDto, StaffLoanQueryOptionsDto, UpdateStaffLoanDto } from '../../dto/staff-loan.dto';
export declare class StaffLoansService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateStaffLoanDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        reason: string;
        staffId: string;
        issueDate: Date;
        amount: number;
        deductionPerMonth: number;
        remainingAmount: number;
    }>;
    findAll(queryOptions: StaffLoanQueryOptionsDto): Promise<PageDto<{
        staff: {
            user: {
                firstName: string;
                lastName: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            status: string;
            profile: Prisma.JsonValue | null;
            branchId: string | null;
            documents: Prisma.JsonValue | null;
            employeeId: string | null;
            department: string | null;
            designation: string | null;
            joiningDate: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        reason: string;
        staffId: string;
        issueDate: Date;
        amount: number;
        deductionPerMonth: number;
        remainingAmount: number;
    }>>;
    findOne(id: string): Promise<{
        staff: {
            user: {
                firstName: string;
                lastName: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            status: string;
            profile: Prisma.JsonValue | null;
            branchId: string | null;
            documents: Prisma.JsonValue | null;
            employeeId: string | null;
            department: string | null;
            designation: string | null;
            joiningDate: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        reason: string;
        staffId: string;
        issueDate: Date;
        amount: number;
        deductionPerMonth: number;
        remainingAmount: number;
    }>;
    update(id: string, updateDto: UpdateStaffLoanDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        reason: string;
        staffId: string;
        issueDate: Date;
        amount: number;
        deductionPerMonth: number;
        remainingAmount: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        reason: string;
        staffId: string;
        issueDate: Date;
        amount: number;
        deductionPerMonth: number;
        remainingAmount: number;
    }>;
}
