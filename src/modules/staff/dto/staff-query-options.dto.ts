import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class StaffQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional({ description: 'Filter by department' })
  @IsString()
  @IsOptional()
  readonly department?: string;

  @ApiPropertyOptional({ description: 'Filter by branch ID' })
  @IsUUID()
  @IsOptional()
  readonly branchId?: string;

  @ApiPropertyOptional({ description: 'Filter by status (e.g. ACTIVE, ON_LEAVE)' })
  @IsString()
  @IsOptional()
  readonly status?: string;
}
