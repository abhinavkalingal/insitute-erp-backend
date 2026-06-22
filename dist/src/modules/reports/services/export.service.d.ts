export declare class ExportService {
    generateCsv(data: any[]): Promise<string>;
    generateExcel(data: any[]): Promise<Buffer>;
    generatePdf(data: any[], title?: string): Promise<Buffer>;
}
