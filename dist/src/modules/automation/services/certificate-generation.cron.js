"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CertificateGenerationCron_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateGenerationCron = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../../../infrastructure/database/prisma.service");
let CertificateGenerationCron = CertificateGenerationCron_1 = class CertificateGenerationCron {
    prisma;
    logger = new common_1.Logger(CertificateGenerationCron_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async handleCertificateGeneration() {
        this.logger.debug('Running daily auto-certificate generation...');
        await this.processCertificates();
    }
    async processCertificates() {
        const eligibleResults = await this.prisma.studentResult.findMany({
            where: {
                percentage: { gte: 40 },
            },
            include: {
                student: true,
                term: true
            }
        });
        let generatedCount = 0;
        for (const result of eligibleResults) {
            const template = await this.prisma.certificateTemplate.findFirst({
                where: {}
            });
            if (!template)
                continue;
            const existingCert = await this.prisma.issuedCertificate.findUnique({
                where: {
                    templateId_studentId: {
                        templateId: template.id,
                        studentId: result.studentId
                    }
                }
            });
            if (!existingCert) {
                await this.prisma.issuedCertificate.create({
                    data: {
                        templateId: template.id,
                        studentId: result.studentId,
                        certificateNumber: `CERT-${Date.now()}-${result.studentId.substring(0, 4)}`
                    }
                });
                generatedCount++;
            }
        }
        if (generatedCount > 0) {
            this.logger.log(`Generated ${generatedCount} new certificates.`);
        }
    }
};
exports.CertificateGenerationCron = CertificateGenerationCron;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CertificateGenerationCron.prototype, "handleCertificateGeneration", null);
exports.CertificateGenerationCron = CertificateGenerationCron = CertificateGenerationCron_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CertificateGenerationCron);
//# sourceMappingURL=certificate-generation.cron.js.map