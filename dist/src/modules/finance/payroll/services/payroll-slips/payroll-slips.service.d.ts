import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
import { GeneratePayrollSlipDto, PayPayrollSlipDto, PayrollSlipQueryOptionsDto } from '../../dto/payroll-slip.dto';
export declare class PayrollSlipsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    generate(generateDto: GeneratePayrollSlipDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        year: number;
        staffId: string;
        paymentDate: Date | null;
        paymentMethod: string | null;
        reference: string | null;
        month: number;
        basicPay: number;
        allowances: Prisma.JsonValue | null;
        deductions: Prisma.JsonValue | null;
        loanDeduction: number;
        netPay: number;
    }>;
    paySlip(id: string, payDto: PayPayrollSlipDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        year: number;
        staffId: string;
        paymentDate: Date | null;
        paymentMethod: string | null;
        reference: string | null;
        month: number;
        basicPay: number;
        allowances: Prisma.JsonValue | null;
        deductions: Prisma.JsonValue | null;
        loanDeduction: number;
        netPay: number;
    }>;
    findAll(queryOptions: PayrollSlipQueryOptionsDto): Promise<PageDto<{
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
        status: string;
        year: number;
        staffId: string;
        paymentDate: Date | null;
        paymentMethod: string | null;
        reference: string | null;
        month: number;
        basicPay: number;
        allowances: Prisma.JsonValue | null;
        deductions: Prisma.JsonValue | null;
        loanDeduction: number;
        netPay: number;
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
        status: string;
        year: number;
        staffId: string;
        paymentDate: Date | null;
        paymentMethod: string | null;
        reference: string | null;
        month: number;
        basicPay: number;
        allowances: Prisma.JsonValue | null;
        deductions: Prisma.JsonValue | null;
        loanDeduction: number;
        netPay: number;
    }>;
}
