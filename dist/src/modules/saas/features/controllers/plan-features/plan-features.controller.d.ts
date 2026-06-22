import { AssignPlanFeatureDto, UpdatePlanFeatureDto } from '../../dto/plan-feature.dto';
import { PlanFeaturesService } from '../../services/plan-features/plan-features.service';
export declare class PlanFeaturesController {
    private readonly planFeaturesService;
    constructor(planFeaturesService: PlanFeaturesService);
    assignFeature(planId: string, assignDto: AssignPlanFeatureDto): Promise<{
        feature: {
            id: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            type: string;
            key: string;
        };
    } & {
        id: string;
        planId: string;
        featureId: string;
        isEnabled: boolean;
        limitValue: number | null;
    }>;
    getPlanFeatures(planId: string): Promise<({
        feature: {
            id: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            type: string;
            key: string;
        };
    } & {
        id: string;
        planId: string;
        featureId: string;
        isEnabled: boolean;
        limitValue: number | null;
    })[]>;
    updatePlanFeature(planId: string, featureId: string, updateDto: UpdatePlanFeatureDto): Promise<{
        feature: {
            id: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            type: string;
            key: string;
        };
    } & {
        id: string;
        planId: string;
        featureId: string;
        isEnabled: boolean;
        limitValue: number | null;
    }>;
    removePlanFeature(planId: string, featureId: string): Promise<{
        id: string;
        planId: string;
        featureId: string;
        isEnabled: boolean;
        limitValue: number | null;
    }>;
}
