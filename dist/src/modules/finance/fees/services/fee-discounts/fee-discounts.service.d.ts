import { PageDto } from "../../../../../core/utils/pagination/page.dto";
import { PrismaService } from "../../../../../infrastructure/database/prisma.service";
import { CreateFeeDiscountDto, FeeDiscountQueryOptionsDto, UpdateFeeDiscountDto } from '../../dto/fee-discount.dto';
export declare class FeeDiscountsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateFeeDiscountDto): Promise<{
        id: string;
        name: string;
        type: string;
        value: number;
    }>;
    findAll(queryOptions: FeeDiscountQueryOptionsDto): Promise<PageDto<{
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
