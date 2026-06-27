import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
import { CreateSalaryStructureDto, SalaryStructureQueryOptionsDto, UpdateSalaryStructureDto } from '../../dto/salary-structure.dto';
export declare class SalaryStructuresService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private calculateNetSalary;
    create(createDto: CreateSalaryStructureDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        staffId: string;
        basicPay: number;
        allowances: Prisma.JsonValue | null;
        deductions: Prisma.JsonValue | null;
        netSalary: number;
    }>;
    findAll(queryOptions: SalaryStructureQueryOptionsDto): Promise<PageDto<{
        staff: {
            user: {
                firstName: string;
                lastName: string | null;
            };
        } & {
            id: string;
            profile: Prisma.JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            status: string;
            branchId: string | null;
            employeeId: string | null;
            department: string | null;
            designation: string | null;
            joiningDate: Date | null;
            documents: Prisma.JsonValue | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        staffId: string;
        basicPay: number;
        allowances: Prisma.JsonValue | null;
        deductions: Prisma.JsonValue | null;
        netSalary: number;
    }>>;
    findOne(id: string): Promise<{
        staff: {
            user: {
                firstName: string;
                lastName: string | null;
            };
        } & {
            id: string;
            profile: Prisma.JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            status: string;
            branchId: string | null;
            employeeId: string | null;
            department: string | null;
            designation: string | null;
            joiningDate: Date | null;
            documents: Prisma.JsonValue | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        staffId: string;
        basicPay: number;
        allowances: Prisma.JsonValue | null;
        deductions: Prisma.JsonValue | null;
        netSalary: number;
    }>;
    update(id: string, updateDto: UpdateSalaryStructureDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        staffId: string;
        basicPay: number;
        allowances: Prisma.JsonValue | null;
        deductions: Prisma.JsonValue | null;
        netSalary: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        staffId: string;
        basicPay: number;
        allowances: Prisma.JsonValue | null;
        deductions: Prisma.JsonValue | null;
        netSalary: number;
    }>;
}
