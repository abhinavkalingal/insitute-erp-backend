import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMaterialCategoryDto {
  @ApiProperty({ example: 'Lecture Notes' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'PDFs of daily class notes' })
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateMaterialCategoryDto extends PartialType(CreateMaterialCategoryDto) {}

export class MaterialCategoryQueryOptionsDto extends PageOptionsDto {}
