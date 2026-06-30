import { IdCardsService } from './id-cards.service';
import { Prisma } from '@prisma/client';
export declare class IdCardsController {
    private readonly idCardsService;
    constructor(idCardsService: IdCardsService);
    createTemplate(data: Prisma.IdCardTemplateCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        backgroundUrl: string | null;
        contentHtml: string | null;
        roleType: string;
        canvasState: Prisma.JsonValue | null;
    }>;
    getTemplates(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        backgroundUrl: string | null;
        contentHtml: string | null;
        roleType: string;
        canvasState: Prisma.JsonValue | null;
    }[]>;
    getTemplateById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        backgroundUrl: string | null;
        contentHtml: string | null;
        roleType: string;
        canvasState: Prisma.JsonValue | null;
    }>;
    updateTemplate(id: string, data: Prisma.IdCardTemplateUpdateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        backgroundUrl: string | null;
        contentHtml: string | null;
        roleType: string;
        canvasState: Prisma.JsonValue | null;
    }>;
    deleteTemplate(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        backgroundUrl: string | null;
        contentHtml: string | null;
        roleType: string;
        canvasState: Prisma.JsonValue | null;
    }>;
}
