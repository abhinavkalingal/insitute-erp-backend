import { DocumentsService } from './documents.service';
import { Prisma } from '@prisma/client';
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    createDocument(data: Prisma.CompanyDocumentCreateInput): Promise<any>;
    getDocuments(): Promise<any>;
    getDocumentById(id: string): Promise<any>;
    updateDocument(id: string, data: Prisma.CompanyDocumentUpdateInput): Promise<any>;
    deleteDocument(id: string): Promise<any>;
}
