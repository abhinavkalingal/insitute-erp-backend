import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '@infrastructure/database/prisma.service';

@Injectable()
export class CertificateGenerationCron {
  private readonly logger = new Logger(CertificateGenerationCron.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCertificateGeneration() {
    this.logger.debug('Running daily auto-certificate generation...');
    await this.processCertificates();
  }

  async processCertificates() {
    // This looks for students who passed their exams and do not have an issued certificate yet
    // In a real scenario, this logic would check against `GradeRule` or `StudentResult.percentage` >= passing criteria.
    const eligibleResults = await this.prisma.studentResult.findMany({
      where: {
        percentage: { gte: 40 }, // Example passing criteria
      },
      include: {
        student: true,
        term: true}});

    let generatedCount = 0;
    for (const result of eligibleResults) {
      // Find a default template for the institute
      const template = await this.prisma.certificateTemplate.findFirst({
        where: { }});

      if (!template) continue; // No template configured

      // Check if certificate is already issued
      const existingCert = await this.prisma.issuedCertificate.findUnique({
        where: {
          templateId_studentId: {
            templateId: template.id,
            studentId: result.studentId}}});

      if (!existingCert) {
        // Issue new certificate
        await this.prisma.issuedCertificate.create({
          data: {
            
            templateId: template.id,
            studentId: result.studentId,
            certificateNumber: `CERT-${Date.now()}-${result.studentId.substring(0, 4)}`}});
        generatedCount++;
      }
    }

    if (generatedCount > 0) {
      this.logger.log(`Generated ${generatedCount} new certificates.`);
    }
  }
}
