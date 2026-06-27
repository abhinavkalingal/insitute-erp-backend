import { PlacementsService } from './placements.service';
import { Prisma } from '@prisma/client';
export declare class PlacementsController {
    private readonly placementsService;
    constructor(placementsService: PlacementsService);
    createCompany(data: Prisma.CompanyCreateInput): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        industry: string | null;
        website: string | null;
        hrName: string | null;
        hrEmail: string | null;
        hrPhone: string | null;
    }>;
    getCompanies(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        industry: string | null;
        website: string | null;
        hrName: string | null;
        hrEmail: string | null;
        hrPhone: string | null;
    }[]>;
    updateCompany(id: string, data: Prisma.CompanyUpdateInput): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        industry: string | null;
        website: string | null;
        hrName: string | null;
        hrEmail: string | null;
        hrPhone: string | null;
    }>;
    deleteCompany(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        industry: string | null;
        website: string | null;
        hrName: string | null;
        hrEmail: string | null;
        hrPhone: string | null;
    }>;
    createDrive(data: Prisma.PlacementDriveCreateInput): Promise<{
        date: Date;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        batchId: string | null;
        companyId: string;
    }>;
    getDrives(): Promise<({
        company: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            industry: string | null;
            website: string | null;
            hrName: string | null;
            hrEmail: string | null;
            hrPhone: string | null;
        };
    } & {
        date: Date;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        batchId: string | null;
        companyId: string;
    })[]>;
    updateDrive(id: string, data: Prisma.PlacementDriveUpdateInput): Promise<{
        date: Date;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        batchId: string | null;
        companyId: string;
    }>;
    deleteDrive(id: string): Promise<{
        date: Date;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
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
                name: string;
                createdAt: Date;
                updatedAt: Date;
                industry: string | null;
                website: string | null;
                hrName: string | null;
                hrEmail: string | null;
                hrPhone: string | null;
            };
        } & {
            date: Date;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            status: string;
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
    getApplications(jobId: string): Promise<({
        student: {
            id: string;
            profile: Prisma.JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            status: string;
            courseId: string | null;
            batchId: string | null;
            branchId: string | null;
            documents: Prisma.JsonValue | null;
            enrollmentNo: string | null;
            admissionDate: Date | null;
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
