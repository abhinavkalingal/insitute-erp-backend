import { PrismaService } from "../../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
export declare class DocumentsService {
    private prisma;
    constructor(prisma: PrismaService);
    createDocument(data: Prisma.CompanyDocumentCreateInput): Promise<any>;
    getDocuments(): Promise<any>;
    getDocumentById(id: string): Promise<any>;
    updateDocument(id: string, data: Prisma.CompanyDocumentUpdateInput): Promise<any>;
    deleteDocument(id: string): Promise<any>;
}
