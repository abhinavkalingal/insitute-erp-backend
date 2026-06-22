import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBooleanString, IsOptional } from 'class-validator';

export class BranchQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional({ description: 'Filter by active status (true/false)' })
  @IsBooleanString()
  @IsOptional()
  readonly isActive?: string;
}
