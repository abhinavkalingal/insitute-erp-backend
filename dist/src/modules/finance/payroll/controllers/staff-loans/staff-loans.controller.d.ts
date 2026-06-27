import { CreateStaffLoanDto, StaffLoanQueryOptionsDto, UpdateStaffLoanDto } from '../../dto/staff-loan.dto';
import { StaffLoansService } from '../../services/staff-loans/staff-loans.service';
export declare class StaffLoansController {
    private readonly staffLoansService;
    constructor(staffLoansService: StaffLoansService);
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
    findAll(queryOptions: StaffLoanQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
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
