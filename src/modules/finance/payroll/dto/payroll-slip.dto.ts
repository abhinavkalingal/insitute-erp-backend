import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min} from 'class-validator';

export class GeneratePayrollSlipDto {
  @ApiProperty({ example: 'uuid-of-staff' })
  @IsUUID()
  @IsNotEmpty()
  staffId: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @ApiProperty({ example: 2023 })
  @IsInt()
  @Min(2000)
  year: number;
}

export class PayPayrollSlipDto {
  @ApiProperty({ example: '2023-10-31T00:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  paymentDate: string;

  @ApiProperty({ example: 'BANK_TRANSFER' })
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @ApiPropertyOptional({ example: 'txn_987654321' })
  @IsString()
  @IsOptional()
  reference?: string;
}

export class PayrollSlipQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly staffId?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  readonly month?: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  readonly year?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly status?: string;
}
