import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class AttendanceQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional({ description: 'Filter by exact date (YYYY-MM-DD)' })
  @IsDateString()
  @IsOptional()
  readonly date?: string;

  @ApiPropertyOptional({ description: 'Filter by start date' })
  @IsDateString()
  @IsOptional()
  readonly startDate?: string;

  @ApiPropertyOptional({ description: 'Filter by end date' })
  @IsDateString()
  @IsOptional()
  readonly endDate?: string;

  @ApiPropertyOptional({ description: 'Filter by STUDENT or STAFF' })
  @IsString()
  @IsOptional()
  readonly type?: string;

  @ApiPropertyOptional({ description: 'Filter by batch ID' })
  @IsUUID()
  @IsOptional()
  readonly batchId?: string;

  @ApiPropertyOptional({ description: 'Filter by branch ID' })
  @IsUUID()
  @IsOptional()
  readonly branchId?: string;

  @ApiPropertyOptional({ description: 'Filter by specific student' })
  @IsUUID()
  @IsOptional()
  readonly studentId?: string;

  @ApiPropertyOptional({ description: 'Filter by specific staff' })
  @IsUUID()
  @IsOptional()
  readonly staffId?: string;
}
