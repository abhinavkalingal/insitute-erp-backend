import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class ResultQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional({ description: 'Filter by specific exam term' })
  @IsUUID()
  @IsOptional()
  readonly examTermId?: string;

  @ApiPropertyOptional({ description: 'Filter by specific student' })
  @IsUUID()
  @IsOptional()
  readonly studentId?: string;
}
