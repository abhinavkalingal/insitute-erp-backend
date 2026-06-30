import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { Prisma } from '@prisma/client';
import { CreateIdTemplateDto, IdTemplateQueryOptionsDto, UpdateIdTemplateDto } from '../../dto/id-template.dto';
export declare class IdCardTemplatesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateIdTemplateDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        backgroundUrl: string | null;
        contentHtml: string | null;
        roleType: string;
        canvasState: Prisma.JsonValue | null;
    }>;
    findAll(queryOptions: IdTemplateQueryOptionsDto): Promise<PageDto<{
        _count: {
            issued: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        backgroundUrl: string | null;
        contentHtml: string | null;
        roleType: string;
        canvasState: Prisma.JsonValue | null;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        backgroundUrl: string | null;
        contentHtml: string | null;
        roleType: string;
        canvasState: Prisma.JsonValue | null;
    }>;
    update(id: string, updateDto: UpdateIdTemplateDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        backgroundUrl: string | null;
        contentHtml: string | null;
        roleType: string;
        canvasState: Prisma.JsonValue | null;
    }>;
    remove(id: string): Promise<{
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
