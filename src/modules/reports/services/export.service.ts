import { Injectable } from '@nestjs/common';
import { Parser } from 'json2csv';
import * as ExcelJS from 'exceljs';
import PDFDocument = require('pdfkit');

@Injectable()
export class ExportService {
  async generateCsv(data: any[]): Promise<string> {
    if (!data || data.length === 0) return '';
    const parser = new Parser();
    return parser.parse(data);
  }

  async generateExcel(data: any[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Report');

    if (data && data.length > 0) {
      // Create headers
      const columns = Object.keys(data[0]).map((key) => ({
        header: key.toUpperCase(),
        key,
        width: 20}));
      worksheet.columns = columns;

      // Add rows
      worksheet.addRows(data);
    }

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  async generatePdf(data: any[], title: string = 'Report'): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 30, size: 'A4' });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // Title
      doc.fontSize(20).text(title, { align: 'center' });
      doc.moveDown();

      if (!data || data.length === 0) {
        doc.fontSize(12).text('No data available.');
      } else {
        // Very basic PDF rendering (for a real app, you'd use a table drawing library or pdfmake)
        doc.fontSize(10);
        data.forEach((row, index) => {
          doc.text(`--- Row ${index + 1} ---`);
          Object.entries(row).forEach(([key, value]) => {
            doc.text(`${key}: ${value}`);
          });
          doc.moveDown();
        });
      }

      doc.end();
    });
  }
}
