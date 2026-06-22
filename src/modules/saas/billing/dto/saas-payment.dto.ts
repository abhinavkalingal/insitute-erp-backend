import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export enum SaasPaymentMethod {
  CARD = 'CARD',
  UPI = 'UPI',
  NETBANKING = 'NETBANKING',
  MANUAL = 'MANUAL'}

export enum SaasPaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'}

export class InitiateSaasPaymentDto {
  @ApiProperty({ example: 'uuid-of-invoice' })
  @IsUUID()
  @IsNotEmpty()
  invoiceId: string;

  @ApiProperty({ example: 116.82 })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ enum: SaasPaymentMethod })
  @IsEnum(SaasPaymentMethod)
  @IsNotEmpty()
  paymentMethod: string;
}

export class UpdateSaasPaymentStatusDto {
  @ApiProperty({ enum: SaasPaymentStatus })
  @IsEnum(SaasPaymentStatus)
  @IsNotEmpty()
  status: string;

  @ApiPropertyOptional({ example: 'txn_123456789' })
  @IsString()
  @IsOptional()
  transactionId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  metadata?: any;
}

export class SaasPaymentQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional({ enum: SaasPaymentStatus })
  @IsEnum(SaasPaymentStatus)
  @IsOptional()
  readonly status?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly invoiceId?: string;
}
