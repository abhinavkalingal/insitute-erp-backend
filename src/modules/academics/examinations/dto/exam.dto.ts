import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min} from 'class-validator';

// --- Exam Term DTOs ---

export class CreateExamTermDto {
  @ApiProperty({ example: 'Fall Midterms 2023' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '2023-10-01T00:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ example: '2023-10-15T23:59:59Z' })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}

export class UpdateExamTermDto extends PartialType(CreateExamTermDto) {}

export class ExamTermQueryOptionsDto extends PageOptionsDto {}

// --- Exam DTOs ---

export class CreateExamDto {
  @ApiProperty({ example: 'uuid-of-exam-term' })
  @IsUUID()
  @IsNotEmpty()
  examTermId: string;

  @ApiProperty({ example: 'uuid-of-subject' })
  @IsUUID()
  @IsNotEmpty()
  subjectId: string;

  @ApiPropertyOptional({ example: 'uuid-of-course' })
  @IsUUID()
  @IsOptional()
  courseId?: string;

  @ApiPropertyOptional({ example: 'uuid-of-batch' })
  @IsUUID()
  @IsOptional()
  batchId?: string;

  @ApiProperty({ example: '2023-10-10T00:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: '09:00' })
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({ example: '12:00' })
  @IsString()
  @IsNotEmpty()
  endTime: string;

  @ApiProperty({ example: 100 })
  @IsInt()
  @Min(1)
  maxMarks: number;

  @ApiProperty({ example: 40 })
  @IsInt()
  @Min(1)
  passingMarks: number;
}

export class UpdateExamDto extends PartialType(CreateExamDto) {}

export class ExamQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly examTermId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly subjectId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly courseId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly batchId?: string;
}
