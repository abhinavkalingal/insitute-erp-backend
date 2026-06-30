import { PrismaService } from "../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
export declare class PlacementsService {
    private prisma;
    constructor(prisma: PrismaService);
    createCompany(data: Prisma.CompanyCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        industry: string | null;
        website: string | null;
        hrName: string | null;
        hrEmail: string | null;
        hrPhone: string | null;
    }>;
    getCompanies(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        industry: string | null;
        website: string | null;
        hrName: string | null;
        hrEmail: string | null;
        hrPhone: string | null;
    }[]>;
    updateCompany(id: string, data: Prisma.CompanyUpdateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        industry: string | null;
        website: string | null;
        hrName: string | null;
        hrEmail: string | null;
        hrPhone: string | null;
    }>;
    deleteCompany(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        industry: string | null;
        website: string | null;
        hrName: string | null;
        hrEmail: string | null;
        hrPhone: string | null;
    }>;
    createDrive(data: Prisma.PlacementDriveCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        date: Date;
        batchId: string | null;
        companyId: string;
    }>;
    getDrives(): Promise<({
        company: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            industry: string | null;
            website: string | null;
            hrName: string | null;
            hrEmail: string | null;
            hrPhone: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        date: Date;
        batchId: string | null;
        companyId: string;
    })[]>;
    updateDrive(id: string, data: Prisma.PlacementDriveUpdateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        date: Date;
        batchId: string | null;
        companyId: string;
    }>;
    deleteDrive(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        date: Date;
        batchId: string | null;
        companyId: string;
    }>;
    createJobPosting(data: Prisma.JobPostingCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        requirements: string | null;
        package: string | null;
        locations: string | null;
        driveId: string;
    }>;
    getJobPostings(driveId?: string): Promise<({
        _count: {
            applications: number;
        };
        drive: {
            company: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                industry: string | null;
                website: string | null;
                hrName: string | null;
                hrEmail: string | null;
                hrPhone: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            status: string;
            date: Date;
            batchId: string | null;
            companyId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        requirements: string | null;
        package: string | null;
        locations: string | null;
        driveId: string;
    })[]>;
    updateJobPosting(id: string, data: Prisma.JobPostingUpdateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        requirements: string | null;
        package: string | null;
        locations: string | null;
        driveId: string;
    }>;
    deleteJobPosting(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        requirements: string | null;
        package: string | null;
        locations: string | null;
        driveId: string;
    }>;
    createApplication(data: Prisma.JobApplicationCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        studentId: string;
        notes: string | null;
        jobPostingId: string;
    }>;
    getApplications(jobId: string): Promise<({
        student: {
            user: {
                id: string;
                email: string;
                passwordHash: string;
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
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            status: string;
            profile: Prisma.JsonValue | null;
            courseId: string | null;
            batchId: string | null;
            branchId: string | null;
            enrollmentNo: string | null;
            admissionDate: Date | null;
            documents: Prisma.JsonValue | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        studentId: string;
        notes: string | null;
        jobPostingId: string;
    })[]>;
    updateApplicationStatus(id: string, status: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        studentId: string;
        notes: string | null;
        jobPostingId: string;
    }>;
}
