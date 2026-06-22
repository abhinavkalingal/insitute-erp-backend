import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

// --- Category DTOs ---

export class CreateFeeCategoryDto {
  @ApiProperty({ example: 'Tuition Fee' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Standard tuition fee for academic year' })
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateFeeCategoryDto extends PartialType(CreateFeeCategoryDto) {}

export class FeeCategoryQueryOptionsDto extends PageOptionsDto {}

// --- Structure DTOs ---

export class CreateFeeStructureDto {
  @ApiProperty({ example: 'uuid-of-category' })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ example: 'Fall 2023 10th Grade Tuition' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1500.0 })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiPropertyOptional({ example: 'uuid-of-course' })
  @IsUUID()
  @IsOptional()
  courseId?: string;

  @ApiPropertyOptional({ example: 'uuid-of-batch' })
  @IsUUID()
  @IsOptional()
  batchId?: string;
}

export class UpdateFeeStructureDto extends PartialType(CreateFeeStructureDto) {}

export class FeeStructureQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly categoryId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly courseId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly batchId?: string;
}
