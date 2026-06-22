import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateBatchDto {
  @ApiProperty({ example: 'uuid-of-course' })
  @IsUUID()
  @IsNotEmpty()
  courseId: string;

  @ApiProperty({ example: 'uuid-of-academic-year' })
  @IsUUID()
  @IsNotEmpty()
  academicYearId: string;

  @ApiPropertyOptional({ example: 'uuid-of-branch' })
  @IsUUID()
  @IsOptional()
  branchId?: string;

  @ApiProperty({ example: 'Section A' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 60 })
  @IsInt()
  @IsOptional()
  capacity?: number;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateBatchDto extends PartialType(CreateBatchDto) {}

export class BatchQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional({ description: 'Filter by course ID' })
  @IsUUID()
  @IsOptional()
  readonly courseId?: string;

  @ApiPropertyOptional({ description: 'Filter by branch ID' })
  @IsUUID()
  @IsOptional()
  readonly branchId?: string;

  @ApiPropertyOptional({ description: 'Filter by active status' })
  @IsString()
  @IsOptional()
  readonly isActive?: string;
}
