import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Readable } from 'stream';
import csvParser = require('csv-parser');
import { Parser } from 'json2csv';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DataImportExportService {
  private readonly logger = new Logger(DataImportExportService.name);

  constructor(private readonly prisma: PrismaService) {}

  generateStudentTemplate(): string {
    const fields = ['firstName', 'lastName', 'email', 'enrollmentNumber'];
    const json2csvParser = new Parser({ fields });
    return json2csvParser.parse([]); // Return empty headers
  }

  async importStudents( fileBuffer: Buffer) {
    const results: any[] = [];
    const errors: any[] = [];
    let rowIndex = 1; // 1 for header row

    // Promisify the stream processing
    await new Promise((resolve, reject) => {
      const stream = Readable.from(fileBuffer);
      stream
        .pipe(csvParser())
        .on('data', (data) => {
          rowIndex++;
          results.push({ row: rowIndex, data });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    const successLogs: any[] = [];
    const errorLogs: any[] = [];

    // Process each row sequentially to handle DB transactions safely
    for (const item of results) {
      try {
        const { firstName, lastName, email, enrollmentNumber } = item.data;

        if (!firstName || !lastName || !email) {
          throw new Error('Missing required fields: firstName, lastName, email');
        }

        // Check if email already exists
        const existingUser = await this.prisma.user.findUnique({
          where: { email }});

        if (existingUser) {
          throw new Error(`Email ${email} is already in use`);
        }

        // Default password logic for imported users
        const passwordHash = await bcrypt.hash('Password123!', 10);

        // Transaction to ensure atomic User + Student creation
        await this.prisma.$transaction(async (prisma) => {
          const user = await prisma.user.create({
            data: {
              email,
              passwordHash,
              firstName,
              lastName,
              
              isActive: true,
              isEmailVerified: false}});

          await prisma.student.create({
            data: {
              userId: user.id,
              
              enrollmentNo: enrollmentNumber || null}});
        });

        successLogs.push({ row: item.row, message: `Successfully imported ${email}` });
      } catch (error) {
        this.logger.warn(`Failed to import row ${item.row}: ${error.message}`);
        errorLogs.push({ row: item.row, error: error.message });
      }
    }

    return {
      totalProcessed: results.length,
      successCount: successLogs.length,
      errorCount: errorLogs.length,
      successLogs,
      errorLogs};
  }
}
