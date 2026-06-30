import { GeneratePayrollSlipDto, PayPayrollSlipDto, PayrollSlipQueryOptionsDto } from '../../dto/payroll-slip.dto';
import { PayrollSlipsService } from '../../services/payroll-slips/payroll-slips.service';
export declare class PayrollSlipsController {
    private readonly payrollSlipsService;
    constructor(payrollSlipsService: PayrollSlipsService);
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
        allowances: import("@prisma/client/runtime/client").JsonValue | null;
        deductions: import("@prisma/client/runtime/client").JsonValue | null;
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
        allowances: import("@prisma/client/runtime/client").JsonValue | null;
        deductions: import("@prisma/client/runtime/client").JsonValue | null;
        loanDeduction: number;
        netPay: number;
    }>;
    findAll(queryOptions: PayrollSlipQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
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
            profile: import("@prisma/client/runtime/client").JsonValue | null;
            branchId: string | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
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
        year: number;
        staffId: string;
        paymentDate: Date | null;
        paymentMethod: string | null;
        reference: string | null;
        month: number;
        basicPay: number;
        allowances: import("@prisma/client/runtime/client").JsonValue | null;
        deductions: import("@prisma/client/runtime/client").JsonValue | null;
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
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            status: string;
            profile: import("@prisma/client/runtime/client").JsonValue | null;
            branchId: string | null;
            documents: import("@prisma/client/runtime/client").JsonValue | null;
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
        year: number;
        staffId: string;
        paymentDate: Date | null;
        paymentMethod: string | null;
        reference: string | null;
        month: number;
        basicPay: number;
        allowances: import("@prisma/client/runtime/client").JsonValue | null;
        deductions: import("@prisma/client/runtime/client").JsonValue | null;
        loanDeduction: number;
        netPay: number;
    }>;
}
