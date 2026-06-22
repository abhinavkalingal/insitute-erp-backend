import { PrismaMasterService } from "../../../../../infrastructure/database/prisma-master.service";
import { AssignPlanFeatureDto, UpdatePlanFeatureDto } from '../../dto/plan-feature.dto';
export declare class PlanFeaturesService {
    private readonly prisma;
    constructor(prisma: PrismaMasterService);
    assignFeatureToPlan(planId: string, assignDto: AssignPlanFeatureDto): Promise<{
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
