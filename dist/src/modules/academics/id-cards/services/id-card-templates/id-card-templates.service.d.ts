import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
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
        contentHtml: string;
        roleType: string;
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
        contentHtml: string;
        roleType: string;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        backgroundUrl: string | null;
        contentHtml: string;
        roleType: string;
    }>;
    update(id: string, updateDto: UpdateIdTemplateDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        backgroundUrl: string | null;
        contentHtml: string;
        roleType: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        backgroundUrl: string | null;
        contentHtml: string;
        roleType: string;
    }>;
}
