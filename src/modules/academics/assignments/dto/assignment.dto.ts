import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min} from 'class-validator';

export class CreateAssignmentDto {
  @ApiProperty({ example: 'Midterm Essay on Kinetics' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Write a 1000 word essay.' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '2023-11-01T23:59:59Z' })
  @IsDateString()
  @IsNotEmpty()
  dueDate: string;

  @ApiProperty({ example: 'uuid-of-staff' })
  @IsUUID()
  @IsNotEmpty()
  staffId: string;

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

  @ApiPropertyOptional({ example: 100 })
  @IsInt()
  @Min(1)
  @IsOptional()
  maxMarks?: number;
}

export class UpdateAssignmentDto extends PartialType(CreateAssignmentDto) {}

export class AssignmentQueryOptionsDto extends PageOptionsDto {
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

  @ApiPropertyOptional({ description: 'Filter by assignments created by a specific staff member' })
  @IsUUID()
  @IsOptional()
  readonly staffId?: string;
}
