import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { CreateFineRuleDto, FineRuleQueryOptionsDto, UpdateFineRuleDto } from '../../dto/fine-rule.dto';
export declare class FineRulesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateFineRuleDto): Promise<{
        id: string;
        name: string;
        amount: number;
        amountType: string;
        daysAfterDueDate: number;
    }>;
    findAll(queryOptions: FineRuleQueryOptionsDto): Promise<PageDto<{
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
