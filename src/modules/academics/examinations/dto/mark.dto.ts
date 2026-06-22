import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested} from 'class-validator';

export class StudentMarkDto {
  @ApiProperty({ example: 'uuid-of-student' })
  @IsUUID()
  @IsNotEmpty()
  studentId: string;

  @ApiPropertyOptional({ example: 85 })
  @IsInt()
  @Min(0)
  @IsOptional()
  marksObtained?: number;

  @ApiPropertyOptional({ example: 'Good performance' })
  @IsString()
  @IsOptional()
  remarks?: string;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isAbsent?: boolean;
}

export class BulkUpsertMarksDto {
  @ApiProperty({ example: 'uuid-of-exam' })
  @IsUUID()
  @IsNotEmpty()
  examId: string;

  @ApiProperty({ type: [StudentMarkDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudentMarkDto)
  marks: StudentMarkDto[];
}

export class MarkQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly examId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly studentId?: string;
}
