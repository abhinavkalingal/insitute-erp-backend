import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFeeCategoryDto {
  @ApiProperty({ example: 'Tuition Fee' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Annual tuition fee for the academic year' })
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateFeeCategoryDto extends PartialType(CreateFeeCategoryDto) {}

export class FeeCategoryQueryOptionsDto extends PageOptionsDto {}
