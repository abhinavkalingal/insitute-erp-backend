import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class StudentQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional({ description: 'Filter by course ID' })
  @IsString()
  @IsOptional()
  readonly courseId?: string;

  @ApiPropertyOptional({ description: 'Filter by batch ID' })
  @IsString()
  @IsOptional()
  readonly batchId?: string;

  @ApiPropertyOptional({ description: 'Filter by branch ID' })
  @IsUUID()
  @IsOptional()
  readonly branchId?: string;

  @ApiPropertyOptional({ description: 'Filter by status (e.g. ACTIVE, ALUMNI)' })
  @IsString()
  @IsOptional()
  readonly status?: string;
}
