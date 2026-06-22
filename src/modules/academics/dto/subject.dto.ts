import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({ example: 'Mathematics' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'MAT101' })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiPropertyOptional({ example: 4 })
  @IsInt()
  @IsOptional()
  credits?: number;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {}

export class SubjectQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional({ description: 'Filter by active status' })
  @IsString()
  @IsOptional()
  readonly isActive?: string;
}
