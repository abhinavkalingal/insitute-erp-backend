import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsJSON, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum ReportModuleType {
  STUDENTS = 'STUDENTS',
  STAFF = 'STAFF',
  FINANCE = 'FINANCE',
  ATTENDANCE = 'ATTENDANCE',
  ACADEMICS = 'ACADEMICS'}

export class CreateSavedReportDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: ReportModuleType })
  @IsEnum(ReportModuleType)
  module: ReportModuleType;

  @ApiProperty({ description: 'JSON string of filters to apply' })
  @IsJSON()
  @IsNotEmpty()
  filters: string;

  @ApiProperty({ description: 'JSON string of columns to select' })
  @IsJSON()
  @IsNotEmpty()
  columns: string;
}
