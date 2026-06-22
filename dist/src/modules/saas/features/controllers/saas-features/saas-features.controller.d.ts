import { CreateSaasFeatureDto, SaasFeatureQueryOptionsDto, UpdateSaasFeatureDto } from '../../dto/saas-feature.dto';
import { SaasFeaturesService } from '../../services/saas-features/saas-features.service';
export declare class SaasFeaturesController {
    private readonly saasFeaturesService;
    constructor(saasFeaturesService: SaasFeaturesService);
    create(createDto: CreateSaasFeatureDto): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        type: string;
        key: string;
    }>;
    findAll(queryOptions: SaasFeatureQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
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
