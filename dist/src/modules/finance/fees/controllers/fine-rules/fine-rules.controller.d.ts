import { CreateFineRuleDto, FineRuleQueryOptionsDto, UpdateFineRuleDto } from '../../dto/fine-rule.dto';
import { FineRulesService } from '../../services/fine-rules/fine-rules.service';
export declare class FineRulesController {
    private readonly fineRulesService;
    constructor(fineRulesService: FineRulesService);
    create(createDto: CreateFineRuleDto): Promise<{
        id: string;
        name: string;
        amount: number;
        amountType: string;
        daysAfterDueDate: number;
    }>;
    findAll(queryOptions: FineRuleQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
        id: string;
        name: string;
        amount: number;
        amountType: string;
        daysAfterDueDate: number;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        amount: number;
        amountType: string;
        daysAfterDueDate: number;
    }>;
    update(id: string, updateDto: UpdateFineRuleDto): Promise<{
        id: string;
        name: string;
        amount: number;
        amountType: string;
        daysAfterDueDate: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        amount: number;
        amountType: string;
        daysAfterDueDate: number;
    }>;
}
