import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { CreateFeeDiscountDto, FeeDiscountQueryOptionsDto, UpdateFeeDiscountDto } from '../../dto/fee-discount.dto';
export declare class FeeDiscountsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateFeeDiscountDto): Promise<{
        value: number;
        id: string;
        name: string;
        type: string;
    }>;
    findAll(queryOptions: FeeDiscountQueryOptionsDto): Promise<PageDto<{
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
