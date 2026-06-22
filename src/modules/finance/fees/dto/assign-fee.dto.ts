import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class AssignFeeDto {
  @ApiProperty({ example: 'uuid-of-student' })
  @IsUUID()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ example: 'uuid-of-fee-structure' })
  @IsUUID()
  @IsNotEmpty()
  feeStructureId: string;

  @ApiPropertyOptional({ example: 'uuid-of-fee-discount' })
  @IsUUID()
  @IsOptional()
  discountId?: string;

  @ApiPropertyOptional({
    example: '2023-11-01T00:00:00Z',
    description: 'Override default due date'})
  @IsDateString()
  @IsOptional()
  dueDate?: string;
}

export class StudentFeeAssignmentQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly studentId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly feeStructureId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly status?: string;
}
