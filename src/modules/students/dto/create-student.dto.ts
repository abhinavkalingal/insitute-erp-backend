import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateStudentDto {
  // User Fields
  @ApiProperty({ example: 'student@institute.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Jane' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsString()
  @IsOptional()
  lastName?: string;

  // Student Fields
  @ApiPropertyOptional({ example: 'uuid-of-branch' })
  @IsUUID()
  @IsOptional()
  branchId?: string;

  @ApiPropertyOptional({ example: 'ENR-2023-001' })
  @IsString()
  @IsOptional()
  enrollmentNo?: string;

  @ApiPropertyOptional({ example: 'Batch-A' })
  @IsString()
  @IsOptional()
  batchId?: string;

  @ApiPropertyOptional({ example: 'Computer Science' })
  @IsString()
  @IsOptional()
  courseId?: string;

  @ApiPropertyOptional({ description: 'Date of admission in ISO format' })
  @IsString()
  @IsOptional()
  admissionDate?: string;

  @ApiPropertyOptional({
    description: 'Student profile information (e.g. DOB, gender, bloodGroup)'})
  @IsOptional()
  profile?: Record<string, any>;
}
