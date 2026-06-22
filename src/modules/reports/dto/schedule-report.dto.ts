import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsJSON, IsNotEmpty, IsUUID } from 'class-validator';
import { ExportFormat } from './execute-report.dto';

export enum ScheduleFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY'}

export class ScheduleReportDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  savedReportId: string;

  @ApiProperty({ enum: ScheduleFrequency })
  @IsEnum(ScheduleFrequency)
  frequency: ScheduleFrequency;

  @ApiProperty({ enum: ExportFormat })
  @IsEnum(ExportFormat)
  format: ExportFormat;

  @ApiProperty({ description: 'JSON array of email addresses' })
  @IsJSON()
  @IsNotEmpty()
  recipients: string;
}
