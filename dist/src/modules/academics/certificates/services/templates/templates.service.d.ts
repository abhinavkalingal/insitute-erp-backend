import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { CreateTemplateDto, TemplateQueryOptionsDto, UpdateTemplateDto } from '../../dto/template.dto';
export declare class TemplatesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateTemplateDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        backgroundUrl: string | null;
        contentHtml: string;
    }>;
    findAll(queryOptions: TemplateQueryOptionsDto): Promise<PageDto<{
        _count: {
            issued: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        backgroundUrl: string | null;
        contentHtml: string;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        backgroundUrl: string | null;
        contentHtml: string;
    }>;
    update(id: string, updateDto: UpdateTemplateDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        backgroundUrl: string | null;
        contentHtml: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        backgroundUrl: string | null;
        contentHtml: string;
    }>;
}
