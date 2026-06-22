import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsJSON, IsNotEmpty, IsOptional } from 'class-validator';
import { ReportModuleType } from './create-saved-report.dto';

export enum ExportFormat {
  JSON = 'JSON',
  CSV = 'CSV',
  EXCEL = 'EXCEL',
  PDF = 'PDF'}

export class ExecuteReportDto {
  @ApiProperty({ enum: ReportModuleType })
  @IsEnum(ReportModuleType)
  module: ReportModuleType;

  @ApiProperty({ description: 'JSON string of filters to apply' })
  @IsJSON()
  @IsOptional()
  filters?: string;

  @ApiProperty({ description: 'JSON string of columns to select' })
  @IsJSON()
  @IsOptional()
  columns?: string;

  @ApiProperty({ enum: ExportFormat, default: ExportFormat.JSON })
  @IsEnum(ExportFormat)
  @IsOptional()
  format?: ExportFormat = ExportFormat.JSON;
}
