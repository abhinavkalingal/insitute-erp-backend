import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateSubscriptionPlanDto {
  @ApiProperty({ example: 'Pro' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Access to advanced features' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 99 })
  @IsNumber()
  @Min(0)
  monthlyPrice: number;

  @ApiProperty({ example: 990 })
  @IsNumber()
  @Min(0)
  yearlyPrice: number;

  @ApiPropertyOptional({ example: 14 })
  @IsInt()
  @Min(0)
  @IsOptional()
  trialDays?: number;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  features?: any;

  @ApiPropertyOptional()
  @IsOptional()
  metadata?: any;
}

export class UpdateSubscriptionPlanDto extends PartialType(CreateSubscriptionPlanDto) {}

export class SubscriptionPlanQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  readonly isActive?: boolean;
}
