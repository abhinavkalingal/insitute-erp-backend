export declare class CreateStudentDto {
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
    branchId?: string;
    enrollmentNo?: string;
    batchId?: string;
    courseId?: string;
    admissionDate?: string;
    profile?: Record<string, any>;
}
