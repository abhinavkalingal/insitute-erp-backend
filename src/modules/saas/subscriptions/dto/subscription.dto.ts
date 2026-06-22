import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export enum BillingCycle {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'}

export class SubscribeDto {
  @ApiProperty({ example: 'uuid-of-plan' })
  @IsUUID()
  @IsNotEmpty()
  planId: string;

  @ApiProperty({ enum: BillingCycle })
  @IsEnum(BillingCycle)
  @IsNotEmpty()
  billingCycle: string;
}

export class UpgradeDowngradeDto {
  @ApiProperty({ example: 'uuid-of-new-plan' })
  @IsUUID()
  @IsNotEmpty()
  planId: string;

  @ApiPropertyOptional({ enum: BillingCycle })
  @IsEnum(BillingCycle)
  @IsOptional()
  billingCycle?: string;
}

export class SubscriptionQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly status?: string;
}
