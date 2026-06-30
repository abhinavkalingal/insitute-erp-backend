import { CreateFeeDiscountDto, FeeDiscountQueryOptionsDto, UpdateFeeDiscountDto } from '../../dto/fee-discount.dto';
import { FeeDiscountsService } from '../../services/fee-discounts/fee-discounts.service';
export declare class FeeDiscountsController {
    private readonly feeDiscountsService;
    constructor(feeDiscountsService: FeeDiscountsService);
    create(createDto: CreateFeeDiscountDto): Promise<{
        id: string;
        name: string;
        type: string;
        value: number;
    }>;
    findAll(queryOptions: FeeDiscountQueryOptionsDto): Promise<import("../../../../../core/utils/pagination/page.dto").PageDto<{
        id: string;
        name: string;
        type: string;
        value: number;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        type: string;
        value: number;
    }>;
    update(id: string, updateDto: UpdateFeeDiscountDto): Promise<{
        id: string;
        name: string;
        type: string;
        value: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        type: string;
        value: number;
    }>;
}
