import { CreateTemplateDto, TemplateQueryOptionsDto, UpdateTemplateDto } from '../../dto/template.dto';
import { TemplatesService } from '../../services/templates/templates.service';
export declare class TemplatesController {
    private readonly templatesService;
    constructor(templatesService: TemplatesService);
    create(createDto: CreateTemplateDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        backgroundUrl: string | null;
        contentHtml: string;
    }>;
    findAll(queryOptions: TemplateQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
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
