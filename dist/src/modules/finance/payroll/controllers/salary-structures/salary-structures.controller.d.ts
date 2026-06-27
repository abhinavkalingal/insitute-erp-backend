import { CreateSalaryStructureDto, SalaryStructureQueryOptionsDto, UpdateSalaryStructureDto } from '../../dto/salary-structure.dto';
import { SalaryStructuresService } from '../../services/salary-structures/salary-structures.service';
export declare class SalaryStructuresController {
    private readonly salaryStructuresService;
    constructor(salaryStructuresService: SalaryStructuresService);
    create(createDto: CreateSalaryStructureDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        staffId: string;
        basicPay: number;
        allowances: import("@prisma/client/runtime/client").JsonValue | null;
        deductions: import("@prisma/client/runtime/client").JsonValue | null;
        netSalary: number;
    }>;
    findAll(queryOptions: SalaryStructureQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
        staff: {
            user: {
                firstName: string;
                lastName: string | null;
            };
        } & {
            id: string;
            profile: import("@prisma/client/runtime/client").JsonValue | null;
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
            documents: import("@prisma/client/runtime/client").JsonValue | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        staffId: string;
        basicPay: number;
        allowances: import("@prisma/client/runtime/client").JsonValue | null;
        deductions: import("@prisma/client/runtime/client").JsonValue | null;
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
            profile: import("@prisma/client/runtime/client").JsonValue | null;
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
            documents: import("@prisma/client/runtime/client").JsonValue | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        staffId: string;
        basicPay: number;
        allowances: import("@prisma/client/runtime/client").JsonValue | null;
        deductions: import("@prisma/client/runtime/client").JsonValue | null;
        netSalary: number;
    }>;
    update(id: string, updateDto: UpdateSalaryStructureDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        staffId: string;
        basicPay: number;
        allowances: import("@prisma/client/runtime/client").JsonValue | null;
        deductions: import("@prisma/client/runtime/client").JsonValue | null;
        netSalary: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        staffId: string;
        basicPay: number;
        allowances: import("@prisma/client/runtime/client").JsonValue | null;
        deductions: import("@prisma/client/runtime/client").JsonValue | null;
        netSalary: number;
    }>;
}
