import { CreateSaasFeatureDto, SaasFeatureQueryOptionsDto, UpdateSaasFeatureDto } from '../../dto/saas-feature.dto';
import { SaasFeaturesService } from '../../services/saas-features/saas-features.service';
export declare class SaasFeaturesController {
    private readonly saasFeaturesService;
    constructor(saasFeaturesService: SaasFeaturesService);
    create(createDto: CreateSaasFeatureDto): Promise<{
        id: string;
        name: string;
        type: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        key: string;
    }>;
    findAll(queryOptions: SaasFeatureQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
        id: string;
        name: string;
        type: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        key: string;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        type: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        key: string;
    }>;
    update(id: string, updateDto: UpdateSaasFeatureDto): Promise<{
        id: string;
        name: string;
        type: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        key: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        type: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        key: string;
    }>;
}
