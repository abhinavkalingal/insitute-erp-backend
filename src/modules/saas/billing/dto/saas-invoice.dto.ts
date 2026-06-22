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

export enum SaasInvoiceStatus {
  DUE = 'DUE',
  PAID = 'PAID',
  FAILED = 'FAILED',
  VOID = 'VOID'}

export class GenerateSaasInvoiceDto {
  @ApiPropertyOptional({ example: 'uuid-of-subscription' })
  @IsUUID()
  @IsOptional()
  subscriptionId?: string;

  @ApiProperty({ example: 99.0 })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ example: '2023-12-31T23:59:59.000Z' })
  @IsDateString()
  @IsNotEmpty()
  dueDate: string;
}

export class SaasInvoiceQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional({ enum: SaasInvoiceStatus })
  @IsEnum(SaasInvoiceStatus)
  @IsOptional()
  readonly status?: string;
}
