import { PrismaService } from "../../../infrastructure/database/prisma.service";
export declare class CertificateGenerationCron {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    handleCertificateGeneration(): Promise<void>;
    processCertificates(): Promise<void>;
}
