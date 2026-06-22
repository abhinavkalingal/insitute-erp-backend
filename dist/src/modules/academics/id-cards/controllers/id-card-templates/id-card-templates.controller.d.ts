import { CreateIdTemplateDto, IdTemplateQueryOptionsDto, UpdateIdTemplateDto } from '../../dto/id-template.dto';
import { IdCardTemplatesService } from '../../services/id-card-templates/id-card-templates.service';
export declare class IdCardTemplatesController {
    private readonly idCardTemplatesService;
    constructor(idCardTemplatesService: IdCardTemplatesService);
    create(createDto: CreateIdTemplateDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        backgroundUrl: string | null;
        contentHtml: string;
        roleType: string;
    }>;
    findAll(queryOptions: IdTemplateQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
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
