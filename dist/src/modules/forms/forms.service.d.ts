import { PrismaService } from "../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
export declare class FormsService {
    private prisma;
    constructor(prisma: PrismaService);
    createForm(data: Prisma.CustomFormCreateInput): Promise<any>;
    getForms(): Promise<any>;
    getFormById(id: string): Promise<any>;
    updateForm(id: string, data: Prisma.CustomFormUpdateInput): Promise<any>;
    deleteForm(id: string): Promise<any>;
    submitForm(formId: string, data: Prisma.FormSubmissionCreateInput): Promise<any>;
    getSubmissions(formId: string): Promise<any>;
}
