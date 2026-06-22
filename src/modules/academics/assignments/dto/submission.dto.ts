import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateSubmissionDto {
  @ApiProperty({ example: 'uuid-of-assignment' })
  @IsUUID()
  @IsNotEmpty()
  assignmentId: string;

  @ApiProperty({ example: 'uuid-of-student' })
  @IsUUID()
  @IsNotEmpty()
  studentId: string;

  @ApiPropertyOptional({ example: 'Here is my essay text...' })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({ example: 'https://storage-url.com/file.pdf' })
  @IsString()
  @IsOptional()
  fileUrl?: string;
}

export class GradeSubmissionDto {
  @ApiProperty({ example: 'uuid-of-staff' })
  @IsUUID()
  @IsNotEmpty()
  staffId: string;

  @ApiProperty({ example: 85 })
  @IsInt()
  @Min(0)
  marksObtained: number;

  @ApiPropertyOptional({ example: 'Good work, but watch your spelling.' })
  @IsString()
  @IsOptional()
  feedback?: string;
}

export class SubmissionQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly assignmentId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly studentId?: string;

  @ApiPropertyOptional({ description: 'Filter by status: SUBMITTED, LATE, GRADED' })
  @IsString()
  @IsOptional()
  readonly status?: string;
}
