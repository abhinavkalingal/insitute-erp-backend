import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min} from 'class-validator';

export enum ExpenseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PAID = 'PAID'}

export class CreateExpenseDto {
  @ApiProperty({ example: 'uuid-of-category' })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiPropertyOptional({ example: 'uuid-of-vendor' })
  @IsUUID()
  @IsOptional()
  vendorId?: string;

  @ApiProperty({ example: 'Plumbing Repair' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Fixed sink in boys bathroom' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 200 })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiPropertyOptional({ example: '2023-10-25T00:00:00Z' })
  @IsDateString()
  @IsOptional()
  expenseDate?: string;

  @ApiPropertyOptional({ example: 'https://s3.bucket/receipts/bill123.pdf' })
  @IsString()
  @IsOptional()
  billUrl?: string;

  @ApiPropertyOptional({ example: 'CHK-998877' })
  @IsString()
  @IsOptional()
  referenceNumber?: string;
}

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
  @ApiPropertyOptional({ enum: ExpenseStatus })
  @IsEnum(ExpenseStatus)
  @IsOptional()
  status?: string;
}

export class ExpenseQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly categoryId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly vendorId?: string;

  @ApiPropertyOptional({ enum: ExpenseStatus })
  @IsOptional()
  readonly status?: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  readonly startDate?: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  readonly endDate?: string;
}
