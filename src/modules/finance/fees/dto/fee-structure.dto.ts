import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested} from 'class-validator';

export class CreateInstallmentPlanDto {
  @ApiProperty({ example: 'Term 1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 50 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  percentage?: number;

  @ApiPropertyOptional({ example: 5000 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  amount?: number;

  @ApiProperty({ example: '2023-10-15T00:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  dueDate: string;
}

export class CreateFeeStructureDto {
  @ApiProperty({ example: 'uuid-of-category' })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ example: '10th Grade Tuition 2023' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 10000 })
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

  @ApiPropertyOptional({ type: [CreateInstallmentPlanDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateInstallmentPlanDto)
  @IsOptional()
  installments?: CreateInstallmentPlanDto[];
}

export class UpdateFeeStructureDto extends PartialType(CreateFeeStructureDto) {}

export class FeeStructureQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly categoryId?: string;
}
