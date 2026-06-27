import { CreateFeeDiscountDto, FeeDiscountQueryOptionsDto, UpdateFeeDiscountDto } from '../../dto/fee-discount.dto';
import { FeeDiscountsService } from '../../services/fee-discounts/fee-discounts.service';
export declare class FeeDiscountsController {
    private readonly feeDiscountsService;
    constructor(feeDiscountsService: FeeDiscountsService);
    create(createDto: CreateFeeDiscountDto): Promise<{
        value: number;
        id: string;
        name: string;
        type: string;
    }>;
    findAll(queryOptions: FeeDiscountQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
        value: number;
        id: string;
        name: string;
        type: string;
    }>>;
    findOne(id: string): Promise<{
        value: number;
        id: string;
        name: string;
        type: string;
    }>;
    update(id: string, updateDto: UpdateFeeDiscountDto): Promise<{
        value: number;
        id: string;
        name: string;
        type: string;
    }>;
    remove(id: string): Promise<{
        value: number;
        id: string;
        name: string;
        type: string;
    }>;
}
