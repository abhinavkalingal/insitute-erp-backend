import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min} from 'class-validator';

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  ONLINE = 'ONLINE'}

export class CreatePaymentDto {
  @ApiProperty({ example: 'uuid-of-invoice' })
  @IsUUID()
  @IsNotEmpty()
  invoiceId: string;

  @ApiProperty({ example: 1500.0 })
  @IsNumber()
  @Min(0.01)
  amount: number;

  @ApiPropertyOptional({ example: '2023-10-15T00:00:00Z' })
  @IsDateString()
  @IsOptional()
  paymentDate?: string;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  paymentMethod: string;

  @ApiPropertyOptional({ example: 'TXN-99887766' })
  @IsString()
  @IsOptional()
  reference?: string;

  @ApiPropertyOptional({ example: 'Paid via direct bank deposit' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class PaymentQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly invoiceId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly receiptNumber?: string;
}
