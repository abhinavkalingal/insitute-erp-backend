import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExpenseCategoryDto {
  @ApiProperty({ example: 'Maintenance' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Repairs and general upkeep' })
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateExpenseCategoryDto extends PartialType(CreateExpenseCategoryDto) {}

export class ExpenseCategoryQueryOptionsDto extends PageOptionsDto {}
