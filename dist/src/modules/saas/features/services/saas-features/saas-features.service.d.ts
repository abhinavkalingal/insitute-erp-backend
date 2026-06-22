import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaMasterService } from "../../../../../infrastructure/database/prisma-master.service";
import { CreateSaasFeatureDto, SaasFeatureQueryOptionsDto, UpdateSaasFeatureDto } from '../../dto/saas-feature.dto';
export declare class SaasFeaturesService {
    private readonly prisma;
    constructor(prisma: PrismaMasterService);
    create(createDto: CreateSaasFeatureDto): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        type: string;
        key: string;
    }>;
    findAll(queryOptions: SaasFeatureQueryOptionsDto): Promise<PageDto<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        type: string;
        key: string;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        type: string;
        key: string;
    }>;
    update(id: string, updateDto: UpdateSaasFeatureDto): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        type: string;
        key: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        type: string;
        key: string;
    }>;
}
