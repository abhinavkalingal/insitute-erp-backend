import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { CreateTemplateDto, TemplateQueryOptionsDto, UpdateTemplateDto } from '../../dto/template.dto';
export declare class TemplatesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateTemplateDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        backgroundUrl: string | null;
        contentHtml: string;
    }>;
    findAll(queryOptions: TemplateQueryOptionsDto): Promise<PageDto<{
        _count: {
            issued: number;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        backgroundUrl: string | null;
        contentHtml: string;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        backgroundUrl: string | null;
        contentHtml: string;
    }>;
    update(id: string, updateDto: UpdateTemplateDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        backgroundUrl: string | null;
        contentHtml: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        backgroundUrl: string | null;
        contentHtml: string;
    }>;
}
