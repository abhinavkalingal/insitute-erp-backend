import { PrismaService } from "../../infrastructure/database/prisma.service";
export interface SearchResultItem {
    id: string;
    type: 'STUDENT' | 'STAFF' | 'COURSE' | 'INVOICE' | 'EVENT';
    title: string;
    subtitle: string;
    url: string;
}
export declare class SearchService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    globalSearch(q: string): Promise<SearchResultItem[]>;
}
