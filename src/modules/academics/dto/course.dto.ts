import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CourseSubjectDto {
  @ApiProperty({ example: 'uuid-of-subject' })
  @IsUUID()
  @IsNotEmpty()
  subjectId: string;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isOptional?: boolean;
}

export class CreateCourseDto {
  @ApiProperty({ example: 'B.Tech Computer Science' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'CSE' })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiPropertyOptional({ example: '4-year undergraduate degree program' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ type: [CourseSubjectDto] })
  @IsArray()
  @IsOptional()
  subjects?: CourseSubjectDto[];
}

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}

export class CourseQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional({ description: 'Filter by active status' })
  @IsString()
  @IsOptional()
  readonly isActive?: string;
}
